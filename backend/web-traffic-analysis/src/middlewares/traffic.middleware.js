const Traffic = require("../models/web-traffic-analysis.model");
const morgan = require("morgan");

const trafficMiddleware = (app) => {
  // Custom morgan token to capture response time
  morgan(":method :url :status :res[content-length] - :response-time ms");

  //  Morgan setup to log traffic data
  app.use(
    morgan(async function (tokens, req, res) {
      let [method, url, status, _, __, responseTime, responseTimeMs] = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ]
        .join(" ")
        .split(" ");

      const trafficData = new Traffic({
        method,
        url,
        responseTimeMs,
        status: parseInt(status, 10),
        responseTime: parseFloat(responseTime),
      });

      await trafficData.save();
    })
  );
};

module.exports = trafficMiddleware;
