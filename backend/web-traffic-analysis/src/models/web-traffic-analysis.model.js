const mongoose = require("mongoose");

const trafficSchema = new mongoose.Schema(
  {
    method: String,
    url: String,
    status: Number,
    responseTime: Number,
    responseTimeMs: String,
    date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Traffic", trafficSchema);
