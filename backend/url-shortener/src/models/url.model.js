const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    urlCode: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Url", urlSchema);
