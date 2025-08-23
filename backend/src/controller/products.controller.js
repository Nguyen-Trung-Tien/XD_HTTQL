const {
  Stock
} = require('../models')

module.exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Lấy tất cả sản phẩm (không phân trang)
    const allProductsRaw = await Stock.findAll({
      where: {
        deleted: false
      }
    });

    // Lấy sản phẩm phân trang
    const {
      count,
      rows: productsRaw
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

    const baseUrl = 'http://localhost:3001';

    const allProducts = allProductsRaw.map(p => {
      const product = p.toJSON();
      return {
        ...product,
        image: product.image ? `${baseUrl}${product.image}` : null
      };
    });

    const products = productsRaw.map(p => {
      const product = p.toJSON();
      return {
        ...product,
        image: product.image ? `${baseUrl}${product.image}` : null
      };
    });

    res.json({
      products,
      allProducts,
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
};


module.exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      unit,
      stock,
      price,
      status
    } = req.body;

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/image/${req.file.filename}`;
    }

    if (!name || !category || !unit || !description || !price || !status) {
      return res.json({
        success: false,
        message: 'Missing required field'
      });
    }

    await Stock.create({
      name,
      category,
      description,
      unit,
      stock,
      price,
      status: stock === 0 ? 'Còn hàng' : 'Hết hàng',
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

    const {
      name,
      category,
      description,
      price,
      status
    } = req.body

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/image/${req.file.filename}`;
    }

    const product = await Stock.findByPk(id);

    await Stock.update({
      name,
      category,
      description,
      price,
      status,
      image: imageUrl
    }, {
      where: {
        id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Cập nhật thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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