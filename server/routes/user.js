const express = require("express");
const router = express.Router();
const {
  list,
  changeRole,
  changeStatus,
  userCart,
  getUserCart,
  saveAddress,
  saveOrders,
  removeCart,
  getOrder,
} = require("../controller/userController");
const { auth } = require("../middleware/auth");

router.get("/user", auth, list);
router.get("/usercart", auth, getUserCart);
router.delete("/usercart", auth, removeCart);
router.post("/usercart", auth, userCart);
router.post("/changerole", auth, changeRole);
router.post("/changestatus", auth, changeStatus);
router.post("/user/address", auth, saveAddress);
router.post("/user/orders", auth, saveOrders);
router.get("/user/order", auth, getOrder);

module.exports = router;
