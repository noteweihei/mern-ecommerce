const express = require("express");
const { product, singleProduct } = require("../controller/adminController");
const router = express.Router();

router.get("/product", product);
router.get("/product/:id", singleProduct);

module.exports = router;
