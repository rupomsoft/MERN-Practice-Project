const express = require("express");

const imageFileConverterController = require("../../controllers/image-file-converter.controller");
const { upload } = require("../../middlewares/multerUploader");

const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  imageFileConverterController.fileConverter
);
router.get("/converter", imageFileConverterController.getAllFiles);

router.get("/converter/:filename", imageFileConverterController.serveFile);

module.exports = router;
