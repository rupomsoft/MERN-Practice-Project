const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const config = require("../config/config");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = config.access_token_secret,
  expiresIn = "365d", //TODO: testing purpose 365d
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (e) {
    console.log("[JWT]", e);
    throw new CustomError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (e) {
    console.log("[JWT]", e);
    throw new CustomError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = config.access_token_secret,
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    console.log("[JWT]", e);
    throw new CustomError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};
