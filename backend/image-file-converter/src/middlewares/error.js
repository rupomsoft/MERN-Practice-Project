const httpStatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const CustomError = require("../utils/CustomError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof CustomError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new CustomError(statusCode, message, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === "production") {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  logger.error(err);

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
