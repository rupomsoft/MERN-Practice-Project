const fs = require("fs");
const path = require("path");
const { UPLOADS_FOLDER } = require("../middlewares/multerUploader");
const CustomError = require("../utils/CustomError");
const sharp = require("sharp");
const config = require("../config/config");

const fileConverter = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new CustomError(400, "No file uploaded.");
    }

    const format = req.query.format || "png";
    const supportedFormats = ["jpeg", "png", "webp", "gif", "tiff"];

    if (!supportedFormats.includes(format)) {
      throw new CustomError(400, "Unsupported file format");
    }

    const inputFile = req.file.path;
    const converterDir = path.join(process.cwd(), "uploads", "converter");
    if (!fs.existsSync(converterDir)) {
      fs.mkdirSync(converterDir, { recursive: true });
    }
    const outputFile = path.join(
      converterDir,
      `converted-${Date.now()}.${format}`
    );

    const relativeOutputFile = path.relative(process.cwd(), outputFile);

    await sharp(inputFile).png().toFile(outputFile);

    res.json({
      message: "Image converted successfully",
      data: `${config.domain}/${config.api_prefix}/${relativeOutputFile}`,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFiles = async (req, res, next) => {
  try {
    const UPLOADS_CONVERTER_FOLDER = path.join(
      process.cwd(),
      "uploads",
      "converter"
    );

    fs.readdir(UPLOADS_CONVERTER_FOLDER, (err, files) => {
      if (err) {
        throw new CustomError(500, "Failed to retrieve files.");
      }

      const fileList = files.filter((file) =>
        fs.statSync(path.join(UPLOADS_CONVERTER_FOLDER, file)).isFile()
      );

      const transformationFiles = fileList.map(
        (fileItem) =>
          `${config.domain}/${config.api_prefix}/uploads/converter/${fileItem}`
      );

      res.json({ files: transformationFiles });
    });
  } catch (error) {
    next(error);
  }
};

const serveFile = async (req, res, next) => {
  try {
    const fileName = req.params.filename;
    const filePath = path.join(process.cwd(), "uploads", "converter", fileName);

    res.sendFile(filePath, { root: "/" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fileConverter,
  serveFile,
  getAllFiles,
};
