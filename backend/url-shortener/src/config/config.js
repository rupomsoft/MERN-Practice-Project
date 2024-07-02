require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  api_prefix: process.env.API_PREFIX,
  shortener_base_url: process.env.SHORTENER_BASE_URL,
  mongodb_connection_string: process.env.MONGO_CONNECTION_STRING,
};
