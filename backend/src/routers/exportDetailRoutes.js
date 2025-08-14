const express = require("express");
const router = express.Router();
const exportDetailController = require("../controller/exportDetailController");

router.get("/get-all", exportDetailController.getAll);
router.get("/get-by-id/:id", exportDetailController.getById);
router.post("/create", exportDetailController.create);
router.put("/update/:id", exportDetailController.update);
router.delete("/remove/:id", exportDetailController.remove);

module.exports = router;
