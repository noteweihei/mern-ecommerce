const mongoose = require("mongoose");

//สร้าง collection ในฐานข้อมูล
const ordersSchema = new mongoose.Schema(
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
    orderstatus: {
      type: String,
      default: "รอดำเนินการ",
    },
    orderdBy: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// ส่ง ฟอร์มข้อมูล ออกไปใช้งาน
module.exports = mongoose.model("orders", ordersSchema);
