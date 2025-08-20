const {
  Stock
} = require('../models')

module.exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Lấy tất cả sản phẩm (không phân trang)
    const allProducts = await Stock.findAll({
      where: {
        deleted: false
      }
    });

    // Lấy sản phẩm phân trang
    const {
      count,
      rows: products
    } = await Stock.findAndCountAll({
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
      category,
      description,
      stock,
      price,
      status
    } = req.body;

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/image/${req.file.filename}`;
    }

    if (!name || !category || !description || !price || !status) {
      return res.json({
        success: false,
        message: 'Missing required field'
      });
    }

    await Stock.create({
      name,
      category,
      description,
      stock,
      price,
      status,
      image: imageUrl
    });

    res.json({
      success: true,
      message: 'Thêm sản phẩm thành công'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports.editProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const [updatedCount] = await Stock.update(req.body, {
      where: {
        id: id
      }
    });

    if (updatedCount === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm'
      });
    }
    const updatedProduct = await Stock.findByPk(id);

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
    const deleted = await Stock.update({
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