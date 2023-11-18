const express = require("express");
const router = express.Router();
const {
  product,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controller/adminController");
router.get("/product", product);
router.post("/addproduct", addProduct);
router.put("/editproduct", editProduct);
router.delete("/deleteproduct", deleteProduct);

module.exports = router;
