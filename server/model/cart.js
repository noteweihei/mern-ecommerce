const mongoose = require("mongoose");

//สร้าง collection ในฐานข้อมูล
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "product",
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    orderdBy: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// ส่ง ฟอร์มข้อมูล ออกไปใช้งาน
module.exports = mongoose.model("carts", cartSchema);
