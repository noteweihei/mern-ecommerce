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

router.get("/product", requireLogin, product);
router.get("/product/:id", requireLogin, singleProduct);
router.post("/addproduct", requireLogin, addProduct);
router.put("/editproduct/:id", requireLogin, editProduct);
router.delete("/deleteproduct/:id", requireLogin, deleteProduct);

module.exports = router;
