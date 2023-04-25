const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 256,
    },
    Profile: {
      type: String,
      required: false,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
      maxLength: 256,
      lowercase: true,
    },
    Password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 256,
    },
    IsAuthor: {
      type: Boolean,
      default: true,
      required: true,
      enum: [true, false],
    },
    IsAdmin: {
      type: Boolean,
      default: false,
      required: true,
      enum: [true, false],
    },
    Articles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Article",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
