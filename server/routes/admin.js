const express = require("express");
const router = express.Router();
const {
  product,
  singleProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controller/adminController");
const { requireLogin } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.get("/product", product);
router.get("/product/:id", singleProduct);
router.post("/addproduct", upload, addProduct);
router.put("/editproduct/:id", upload, editProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
