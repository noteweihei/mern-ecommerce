const express = require("express");
const {
  login,
  register,
  currentUser,
  adminCheck,
  loginLine,
} = require("../controller/authController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;
