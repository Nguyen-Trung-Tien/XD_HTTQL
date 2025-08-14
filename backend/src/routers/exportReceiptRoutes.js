const express = require("express");
const router = express.Router();
const exportReceiptController = require("../controller/exportReceiptController");

router.get("/get-all/", exportReceiptController.getAll);
router.get("/get-by-id/:id", exportReceiptController.getById);
router.post("/create", exportReceiptController.create);
router.put("/update/:id", exportReceiptController.update);
router.delete("/remove/:id", exportReceiptController.remove);

module.exports = router;
