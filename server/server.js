const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");

const app = express();

// เชื่อมต่อฐานข้อมูล MongoDB
const db = async () => {
  try {
    await mongoose.connect(process.env.MY_DATABASE);
    console.log("เชื่อมต่อเรียบร้อย");
  } catch (error) {
    console.log(err);
  }
};
db();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// path api
app.use("/api", authRoute);
app.use("/api", adminRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`start server in port ${port}`);
});
