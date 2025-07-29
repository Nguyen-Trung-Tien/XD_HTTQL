const express = require('express')

const router = express.Router()
const productController = require('../controller/products.controller')

router.get('/', productController.getAllProducts)

module.exports = router