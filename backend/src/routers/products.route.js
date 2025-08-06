const express = require('express')

const router = express.Router()
const productController = require('../controller/products.controller')

router.get('/', productController.getAllProducts)
router.post('/create', productController.createProduct)
router.put('/edit/:id', productController.editProduct)

module.exports = router