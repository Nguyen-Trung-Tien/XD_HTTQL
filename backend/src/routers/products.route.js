const express = require('express')

const router = express.Router()
const productController = require('../controller/products.controller')

router.get('/', productController.getAllProducts)
router.post('/create', productController.createProduct)
router.put('/edit/:id', productController.editProduct)
router.delete('/delete/:id', productController.deleteProduct)

module.exports = router