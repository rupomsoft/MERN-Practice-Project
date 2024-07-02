const multer = require("multer");
const path = require("path");
const fs = require("fs");

// File upload folder
const UPLOADS_FOLDER = path.join(process.cwd(), "uploads");

// Ensure the uploads folder exists
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

// Define the storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}${fileExt}`;
    cb(null, file.fieldname + "_" + fileName);
  },
});

// Define the file filter function
const fileFilter = (req, file, cb) => {
  const avatarMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
  const docMimeTypes = ["application/pdf"];

  if (avatarMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type for ${
          file.fieldname
        }. Allowed formats: ${avatarMimeTypes.concat(docMimeTypes).join(", ")}`
      )
    );
  }
};

// Configure the multer upload object
const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
  fileFilter,
});

module.exports = {
  upload,
  UPLOADS_FOLDER,
};
