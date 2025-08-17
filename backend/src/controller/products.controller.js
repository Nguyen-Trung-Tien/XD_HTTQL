const {
  Product
} = require('../models')

module.exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Lấy tất cả sản phẩm (không phân trang)
    const allProducts = await Product.findAll({
      where: {
        deleted: false
      }
    });

    // Lấy sản phẩm phân trang
    const {
      count,
      rows: products
    } = await Product.findAndCountAll({
      where: {
        deleted: false
      },
      limit,
      offset,
      order: [
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      products, // sản phẩm phân trang
      allProducts, // tất cả sản phẩm
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error('Có lỗi khi lấy ra danh sách sản phẩm:', err);
    res.status(500).json({
      error: err.message
    });
  }
}

module.exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      stock,
      price
    } = req.body

    let product = await Product.findOne({
      where: {
        name
      }
    });

    if (product) {
      product.price = price
      product.stock += stock
      await product.save()

      return res.status(200).json({
        message: 'Sản phẩm đã tồn tại, đã cập nhật giá và số lượng',
        product
      });
    } else {
      product = await Product.create(req.body)
      return res.status(201).json({
        message: 'Tạo sản phẩm mới thành công',
        product
      });
    }
  } catch (error) {
    console.error('Có lỗi khi tạo sản phẩm:', error);
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
    console.error('Có lỗi khi cập nhật sản phẩm:', error);
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
        message: "Xóa sản phẩm thành công"
      });
    } else {
      res.status(404).json({
        error: "Không tìm thấy sản phẩm"
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};