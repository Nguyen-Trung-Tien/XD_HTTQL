const express = require('express');
const router = express.Router();
const shipperController = require('../controller/shipperController');

router.get('/get-all', shipperController.getAllShippers);
router.post('/create-new-shipper', shipperController.createShipper);
router.put('/update-shipper/:id', shipperController.updateShipper);
router.delete('/delete-shipper/:id', shipperController.deleteShipper);
router.put('/update-status/:id', shipperController.updateShipperStatus);
module.exports = router;