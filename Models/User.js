const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      min: 5,
      max: 256,
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
      max: 256,
    },
    Password: {
      type: String,
      required: true,
      min: 8,
      max: 256,
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
      ref: "Articles",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
