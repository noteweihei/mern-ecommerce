const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    desp: {
      type: String,
      lowercase: true,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
