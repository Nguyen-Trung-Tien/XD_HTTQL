const { Op } = require("sequelize");
const db = require("../models");

module.exports = {
  createLog: async (req, res) => {
    const { productId, quantity, note, userId, location } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Thiếu productId hoặc quantity" });
    }

    try {
      let stock = await db.Stock.findOne({ where: { productId } });
      if (!stock) {
        stock = await db.Stock.create({
          productId,
          quantity: 0,
          location: location || null,
        });
      }

      const oldQuantity = stock.quantity;
      const newQuantity = oldQuantity + quantity;

      if (quantity < 0 && newQuantity < 0) {
        return res
          .status(400)
          .json({ message: "Số lượng tồn không đủ để xuất" });
      }

      await stock.update({ quantity: newQuantity, location });

      await db.InventoryLog.create({
        stockId: stock.id,
        userId: userId || null,
        change_type: quantity >= 0 ? "IMPORT" : "EXPORT",
        quantity,
        qtyBefore: oldQuantity,
        qtyAfter: newQuantity,
        note,
      });

      return res.status(201).json({
        message: "Cập nhật tồn kho thành công",
        data: { stock, newQuantity },
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },

  adjustInventory: async (req, res) => {
    const { id } = req.params;
    const { newQuantity, note, userId } = req.body;
    try {
      const stock = await db.Stock.findByPk(id);
      if (!stock)
        return res.status(404).json({ message: "Không tìm thấy stock" });

      const oldQuantity = stock.quantity;
      await stock.update({ quantity: newQuantity });

      await db.InventoryLog.create({
        stockId: stock.id,
        userId: userId || null,
        change_type: "ADJUST",
        quantity: newQuantity - oldQuantity,
        qtyBefore: oldQuantity,
        qtyAfter: newQuantity,
        note,
      });

      return res.json({
        message: "Điều chỉnh tồn kho thành công",
        data: stock,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },

  getLogs: async (req, res) => {
    const { productId, type, from, to } = req.query;
    const where = {};
    if (type) where.change_type = type;
    if (from && to)
      where.createdAt = { [Op.between]: [new Date(from), new Date(to)] };

    try {
      const logs = await db.InventoryLog.findAll({
        where,
        include: [
          {
            model: db.Stock,
            as: "stock",
            attributes: ["id", "quantity", "productId"],
            include: [
              { model: db.Product, as: "product", attributes: ["id", "name"] },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      const result = productId
        ? logs.filter((l) => l.stock && l.stock.productId == productId)
        : logs;

      return res.json(result);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },
};
