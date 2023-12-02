const express = require("express");
const router = express.Router();
const {
  list,
  changeRole,
  changeStatus,
  userCart,
} = require("../controller/userController");
const { auth } = require("../middleware/auth");

router.get("/user", auth, list);
router.post("/changerole", auth, changeRole);
router.post("/changestatus", auth, changeStatus);
router.post("/usercart", auth, userCart);

module.exports = router;
