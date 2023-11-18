const express = require("express");
const router = express.Router();
const {
  product,
  singleProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controller/adminController");
router.get("/product", product);
router.get("/product/:id", singleProduct);
router.post("/addproduct", addProduct);
router.put("/editproduct", editProduct);
router.delete("/deleteproduct", deleteProduct);

module.exports = router;
