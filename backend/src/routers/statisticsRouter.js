const express = require('express');
const router = express.Router();
const statisticsController = require('../controller/statisticsController');

router.get('/revenue', statisticsController.getTotalRevenue);
router.get('/general', statisticsController.getGeneralStats);
router.get('/revenue-by-period', statisticsController.getRevenueByPeriod);
router.get('/top-products', statisticsController.getTopSellingProducts);
router.get('/order-status-stats', statisticsController.getOrderStatusStats);
router.get('/all-orders', statisticsController.getAllOrders);
router.get('/all-stock', statisticsController.getAllStock);
router.get('/all-customers', statisticsController.getAllCustomers);
module.exports = router;