const express = require('express');
const router = express.Router();
const statisticsController = require('../controller/statisticsController');

router.get('/revenue', statisticsController.getTotalRevenue);


module.exports = router;