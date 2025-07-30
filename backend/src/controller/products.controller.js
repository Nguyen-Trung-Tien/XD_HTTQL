const {
  Product
} = require('../models')

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
      error: err.message
    });
  }
}

module.exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      error: error.message
    });
  }
}

// module.exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.delete(req.params);
//     res.status(201).json(product);
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({
//       error: error.message
//     });
//   }
// }