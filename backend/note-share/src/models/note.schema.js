const { Schema, model } = require("mongoose");
const DATABASE_CONSTANTS = require("../constant/database.constants");

const noteSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      required: true,
      ref: DATABASE_CONSTANTS.USER,
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      minLength: 2,
      maxLength: 1000,
      required: true,
    },
    isPinpost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Note = model(DATABASE_CONSTANTS.NOTE, noteSchema);
module.exports = Note;
