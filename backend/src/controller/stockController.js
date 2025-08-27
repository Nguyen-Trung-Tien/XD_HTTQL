const db = require("../models");

module.exports = {
  getAllStocks: async (req, res) => {
    try {
      const stocks = await db.Stock.findAll({
        where: { deleted: false },
        order: [["createdAt", "DESC"]],
      });
      return res.json(stocks);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },
  getStockById: async (req, res) => {
    try {
      const stockRecord = await db.Stock.findByPk(req.params.id, {});
      if (!stockRecord)
        return res.status(404).json({ message: "Không tìm thấy stock" });
      return res.json(stockRecord);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },

  updateStock: async (req, res) => {
    try {
      const { stock, warehouseAddress } = req.body;
      const stockRecord = await db.Stock.findByPk(req.params.id);
      if (!stockRecord)
        return res.status(404).json({ message: "Không tìm thấy stock" });

      await stockRecord.update({ stock, warehouseAddress });
      return res.json({
        message: "Cập nhật stock thành công",
        data: stockRecord,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },

  deleteStock: async (req, res) => {
    try {
      const stockRecord = await db.Stock.findByPk(req.params.id);
      if (!stockRecord)
        return res.status(404).json({ message: "Không tìm thấy stock" });

      await stockRecord.destroy();
      return res.json({ message: "Đã xoá stock" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },
};
