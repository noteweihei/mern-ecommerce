const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const { readdirSync } = require("fs");

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
app.use(bodyParse.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("uploads"));

// path api
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`start server in port ${port}`);
});
