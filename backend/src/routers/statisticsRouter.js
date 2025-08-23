const express = require('express');
const router = express.Router();
const statisticsController = require('../controller/statisticsController');

router.get('/revenue', statisticsController.getTotalRevenue);
router.get('/general', statisticsController.getGeneralStats);
router.get('/revenue-by-period', statisticsController.getRevenueByPeriod);
router.get('/top-selling-products', statisticsController.getTopSellingProducts);
router.get('/order-status-stats', statisticsController.getOrderStatusStats);


module.exports = router;