const mongoose = require("mongoose");

//สร้าง collection ในฐานข้อมูล
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
    file: {
      type: String,
      default: "none.jpg",
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ส่ง ฟอร์มข้อมูล ออกไปใช้งาน
module.exports = mongoose.model("product", productSchema);
