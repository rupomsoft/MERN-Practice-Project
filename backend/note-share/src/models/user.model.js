const { Schema, model } = require("mongoose");
const DATABASE_CONSTANTS = require("../constant/database.constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model(DATABASE_CONSTANTS.USER, userSchema);
module.exports = User;
