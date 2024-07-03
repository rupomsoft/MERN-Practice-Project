require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  shortener_base_url: process.env.SHORTENER_BASE_URL,
  mongodb_connection_string: process.env.MONGO_CONNECTION_STRING,
};
