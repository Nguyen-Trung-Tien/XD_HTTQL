const express = require('express')

const router = express.Router()
const productController = require('../controller/products.controller')

router.get('/', productController.getAllProducts)
router.post('/create', productController.createProduct)
// router.delete('/create', productController.deleteProducts)

module.exports = router