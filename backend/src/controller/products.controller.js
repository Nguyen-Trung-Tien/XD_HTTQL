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