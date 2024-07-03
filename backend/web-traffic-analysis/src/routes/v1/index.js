const express = require("express");
const webTrafficAnalysisRoute = require("./web-traffic-analysis.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/traffic",
    route: webTrafficAnalysisRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
