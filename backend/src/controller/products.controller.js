const {
  Product
} = require('../models')

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        deleted: false
      }
    });
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

module.exports.editProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const [updatedCount] = await Product.update(req.body, {
      where: {
        id: id
      }
    });

    if (updatedCount === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm'
      });
    }
    const updatedProduct = await Product.findByPk(id);

    res.status(200).json({
      message: 'Cập nhật thành công',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deleted = await Product.update({
      deleted: true
    }, {
      where: {
        id
      }
    });
    if (deleted) {
      res.json({
        message: "Product deleted"
      });
    } else {
      res.status(404).json({
        error: "Product not found"
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};