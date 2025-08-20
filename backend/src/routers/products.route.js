const express = require('express')

const router = express.Router()
const productController = require('../controller/products.controller')
const {
  upload
} = require('../middleware/multer')

router.get('/', productController.getAllProducts)
router.post('/create', upload, productController.createProduct)
router.put('/edit/:id', productController.editProduct)
router.delete('/delete/:id', productController.deleteProduct)

module.exports = router