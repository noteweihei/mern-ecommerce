const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
