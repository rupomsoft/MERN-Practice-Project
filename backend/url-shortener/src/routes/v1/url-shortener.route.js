const express = require("express");

const urlShortenerController = require("../../controllers/url-shortener.controller");

const router = express.Router();

router.post("/", urlShortenerController.createShortenerURL);
router.get("/:code", urlShortenerController.redirectOriginalURL);

module.exports = router;
