const express = require("express");
const router = express.Router();
const importReceiptController = require("../controller/importReceiptController");

router.get("/get-all", importReceiptController.getAll);
router.get("/get-by/:id", importReceiptController.getById);
router.post("/create/", importReceiptController.create);
router.put("/update/:id", importReceiptController.update);
router.delete("/remove/:id", importReceiptController.remove);
module.exports = router;
