const express = require("express");
const router = express.Router();
const { list, changeRole } = require("../controller/userController");
const { auth } = require("../middleware/auth");

router.get("/user", auth, list);
router.post("/changerole", auth, changeRole);

module.exports = router;
