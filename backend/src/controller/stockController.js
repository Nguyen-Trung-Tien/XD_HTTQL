const db = require("../models");

module.exports = {
  getAllStocks: async (req, res) => {
    try {
      const stocks = await db.Stock.findAll({
        include: [
          { model: db.Product, as: "product", attributes: ["id", "name", "category", "price"] }
        ],
        attributes: ["id", "productId", "quantity", "location", "updatedAt"]
      });

      return res.json(stocks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  getStockById: async (req, res) => {
    try {
      const stock = await db.Stock.findByPk(req.params.id, {
        include: [{ model: db.Product, as: "product", attributes: ["id", "name"] }]
      });
      if (!stock) return res.status(404).json({ message: "Không tìm thấy stock" });
      return res.json(stock);
    } catch (err) {
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  updateStock: async (req, res) => {
    try {
      const { quantity, location } = req.body;
      const stock = await db.Stock.findByPk(req.params.id);
      if (!stock) return res.status(404).json({ message: "Không tìm thấy stock" });

      await stock.update({ quantity, location });
      return res.json({ message: "Cập nhật stock thành công", data: stock });
    } catch (err) {
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  deleteStock: async (req, res) => {
    try {
      const stock = await db.Stock.findByPk(req.params.id);
      if (!stock) return res.status(404).json({ message: "Không tìm thấy stock" });

      await stock.destroy();
      return res.json({ message: "Đã xoá stock" });
    } catch (err) {
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }
};
