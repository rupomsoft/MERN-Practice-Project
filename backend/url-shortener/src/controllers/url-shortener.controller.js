const httpStatus = require("http-status");
const urlShortenerService = require("../services/url-shortener.service");
const config = require("../config/config");
const CustomError = require("../utils/CustomError");

const createShortenerURL = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      throw new CustomError(400, "Invalid original URL");
    }

    const result = await urlShortenerService.createShortenerURL(originalUrl);

    res
      .status(httpStatus.CREATED)
      .json({ data: result, message: "Shortener url create successfully" });
  } catch (error) {
    next(error);
  }
};

const redirectOriginalURL = async (req, res, next) => {
  try {
    if (!req.params.code) {
      throw new CustomError(400, "Invalid params code");
    }

    const result = await urlShortenerService.redirectOriginalURL(
      req.params.code
    );

    return res.redirect(result.originalUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShortenerURL,
  redirectOriginalURL,
};
