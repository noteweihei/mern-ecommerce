const express = require("express");
const router = express.Router();
const {
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controller/adminController");
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { requireLogin } = require("../controller/authController");

router.post("/addproduct", auth, upload, addProduct);
router.put("/editproduct/:id", auth, upload, editProduct);
router.delete("/deleteproduct/:id", auth, deleteProduct);

module.exports = router;
