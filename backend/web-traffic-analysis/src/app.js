const express = require("express");
const helmet = require("helmet");
const httpStatus = require("http-status");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const CustomError = require("./utils/CustomError");
const { errorConverter, errorHandler } = require("./middlewares/error");
const routes = require("./routes/v1");
const trafficMiddleware = require("./middlewares/traffic.middleware");

const app = express();

// set web traffic
trafficMiddleware(app);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new CustomError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to CustomError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
