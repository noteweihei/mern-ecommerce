const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { payment } = require("../controller/userController");

router.post("/payment", auth, payment);

module.exports = router;
