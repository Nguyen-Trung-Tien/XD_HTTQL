const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');


router.get('/get-all', orderController.getAllOrders);
router.post('/create', orderController.createOrder);
router.put('/update/:id', orderController.updateOrderStatus);
router.delete('/delete/:id', orderController.deleteOrder);

module.exports = router;