// routes/importDetailRoutes.js
const express = require("express");
const router = express.Router();
const importDetailController = require("../controller/importDetailController");

router.get("get-all/", importDetailController.getAll);
router.get("get-by/:id", importDetailController.getById);
router.post("create/", importDetailController.create);
router.put("update/:id", importDetailController.update);
router.delete("remove/:id", importDetailController.remove);

module.exports = router;
