const express = require("express");
const {
  product,
  singleProduct,
  productby,
  productbest,
} = require("../controller/adminController");
const router = express.Router();

router.get("/product", product);
router.post("/productby", productby);
router.post("/productbest", productbest);
router.get("/product/:id", singleProduct);

module.exports = router;
