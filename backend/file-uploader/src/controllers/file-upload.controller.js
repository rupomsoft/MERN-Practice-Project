const fs = require("fs");
const path = require("path");
const { UPLOADS_FOLDER } = require("../middlewares/multerUploader");
const logger = require("../config/logger");
const CustomError = require("../utils/CustomError");
const config = require("../config/config");

const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new CustomError(400, "No file uploaded.");
    }
    res.json({ data: req.file, message: "File uploaded successfully." });
  } catch (error) {
    next(error);
  }
};

const uploadMultipleFiles = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new CustomError(400, "No files uploaded.");
    }
    res.json({ data: req.files, message: "File uploaded successfully." });
  } catch (error) {
    next(error);
  }
};

const getAllFiles = async (req, res, next) => {
  try {
    fs.readdir(UPLOADS_FOLDER, (err, files) => {
      if (err) {
        throw new CustomError(500, "Failed to retrieve files.");
      }

      const fileList = files.filter((file) =>
        fs.statSync(path.join(UPLOADS_FOLDER, file)).isFile()
      );

      const transformationFiles = fileList.map(
        (fileItem) =>
          `${config.domain}/${config.api_prefix}/uploads/${fileItem}`
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
    const filePath = path.join(process.cwd(), "uploads", fileName);

    res.sendFile(filePath, { root: "/" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  getAllFiles,
  serveFile,
};
