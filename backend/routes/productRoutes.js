const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add-product", productController.createProduct);
router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/update/:id", productController.updateProductById);
router.delete("/delete/:id", productController.deleteProductById);

module.exports = router;
