const express = require("express");
const router = express.Router();
const suppliersController = require("../controller/suppliersController");

router.get("/get-all", suppliersController.getAll);
router.get("/get-by/:id", suppliersController.getById);
router.post("/create", suppliersController.create);
router.put("/update/:id", suppliersController.update);
router.delete("/remove/:id", suppliersController.remove);

module.exports = router;
