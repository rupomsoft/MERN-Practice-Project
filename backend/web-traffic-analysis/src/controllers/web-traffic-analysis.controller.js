const webTrafficAnalysisService = require("../services/web-traffic-analysis.service");

const getWebTraffic = async (req, res, next) => {
  try {
    const result = await webTrafficAnalysisService.getWebTraffic();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWebTraffic,
};
