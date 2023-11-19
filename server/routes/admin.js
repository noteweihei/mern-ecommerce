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

router.get("/product", product);
router.get("/product/:id", singleProduct);
router.post("/addproduct", addProduct);
router.put("/editproduct/:id", editProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
