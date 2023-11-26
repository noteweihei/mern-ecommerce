const express = require("express");
const {
  login,
  register,
  currentUser,
  requireLogin,
} = require("../controller/authController");
const router = express.Router();
const { auth, adminCheck } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;
