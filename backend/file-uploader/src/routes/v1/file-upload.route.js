const express = require("express");

const fileUploadController = require("../../controllers/file-upload.controller");
const { upload } = require("../../middlewares/multerUploader");

const router = express.Router();

router.post(
  "/single",
  upload.single("file"),
  fileUploadController.uploadSingleFile
);
router.post(
  "/multiple",
  upload.array("files"),
  fileUploadController.uploadMultipleFiles
);

router.get("/", fileUploadController.getAllFiles);
router.get("/:filename", fileUploadController.serveFile);

module.exports = router;
