const express = require("express");
const router = express.Router();
const stockController = require("../controller/stockController");
router.get("/low-stock", stockController.getLowOrOutOfStock);
router.get("/", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

module.exports = router;
