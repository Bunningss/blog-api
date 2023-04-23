const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      min: 10,
      max: 256,
    },
    Image: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Article: {
      type: String,
      required: true,
      min: 15,
    },
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("article", articleSchema);
