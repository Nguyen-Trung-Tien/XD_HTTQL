const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/inventoryController");


router.post("/log", inventoryController.createLog);
router.put("/adjust/:id", inventoryController.adjustInventory);
router.get("/logs", inventoryController.getLogs);

module.exports = router;
