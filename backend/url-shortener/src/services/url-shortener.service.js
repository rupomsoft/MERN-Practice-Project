const shortid = require("shortid");

const Url = require("../models/url.model");
const config = require("../config/config");
const CustomError = require("../utils/CustomError");

const createShortenerURL = async (originalUrl) => {
  const shortenerBaseUrl = config.shortener_base_url;

  if (!shortenerBaseUrl) {
    throw new CustomError(400, "Invalid shortener base original URL");
  }

  const urlCode = shortid.generate(); // Generate a unique URL code

  // Check if the URL is already in the database
  let url = await Url.findOne({ originalUrl });
  if (url) {
    return url;
  }

  // If not, create a new short URL
  const shortUrl = `${shortenerBaseUrl}/${urlCode}`;
  url = new Url({
    originalUrl,
    shortUrl,
    urlCode,
  });

  return url.save();
};

const redirectOriginalURL = async (urlCode) => {
  const url = await Url.findOne({ urlCode });

  if (!url) {
    throw new CustomError(404, "No URL found");
  }

  return url;
};

module.exports = {
  createShortenerURL,
  redirectOriginalURL,
};
