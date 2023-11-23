const express = require("express");
const {
  login,
  register,
  currentUser,
} = require("../controller/authController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/current-user", auth, currentUser);

module.exports = router;
