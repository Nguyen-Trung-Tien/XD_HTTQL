const express = require("express");
const router = express.Router();
const SuppliersController = require("../controller/suppliersController");

router.get("/get-all", SuppliersController.getAll);
router.get("/get-by/:id", SuppliersController.getById);
router.post("/create", SuppliersController.create);
router.put("/update/:id", SuppliersController.update);
router.delete("/remove/:id", SuppliersController.remove);

module.exports = router;
