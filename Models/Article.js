const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 256,
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
      minLength: 15,
    },
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    AuthorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
