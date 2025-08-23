const express = require('express');
const router = express.Router();
const statisticsController = require('../controller/statisticsController');

router.get('/general', statisticsController.getGeneralStats);


module.exports = router;