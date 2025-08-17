const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

router.get('/', inventoryController.getAllInventory);
router.post('/create', inventoryController.createInventory);
router.put('/edit/:id', inventoryController.editInventory);
router.delete('/delete/:id', inventoryController.deleteInventory);

module.exports = router;
