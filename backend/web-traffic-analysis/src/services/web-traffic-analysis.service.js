const Traffic = require("../models/web-traffic-analysis.model");

const getWebTraffic = () => {
  return Traffic.find().sort({ date: -1 });
};

module.exports = {
  getWebTraffic,
};
