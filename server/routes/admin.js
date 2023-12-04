const express = require("express");
const router = express.Router();
const {
  addProduct,
  editProduct,
  deleteProduct,
  getOrderUser,
  changeStatus,
} = require("../controller/adminController");
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.post("/orderuser", auth, getOrderUser);
router.post("/addproduct", auth, upload, addProduct);
router.put("/editproduct/:id", auth, upload, editProduct);
router.put("/change/orderstatus", auth, changeStatus);
router.delete("/deleteproduct/:id", auth, deleteProduct);

module.exports = router;
