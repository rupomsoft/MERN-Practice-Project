const express = require("express");

const webTrafficAnalysisController = require("../../controllers/web-traffic-analysis.controller");

const router = express.Router();

router.get("/", webTrafficAnalysisController.getWebTraffic);

module.exports = router;
