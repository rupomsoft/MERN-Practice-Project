require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  api_prefix: process.env.API_PREFIX,
};
