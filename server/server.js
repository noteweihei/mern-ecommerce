const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
require("dotenv").config();

const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");

const app = express();

// connect cloud database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("เชื่อมต่อเรียบร้อย"))
  .catch((err) => console.log(err));

// middleware
app.use(bodyParse.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("dev"));

// path api
app.use("/api", authRoute);
app.use("/api", adminRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`start server in port ${port}`);
});
