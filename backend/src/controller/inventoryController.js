const db = require('../models');

module.exports = {
  
  getAllInventory: async (req, res) => {
    try {
      const inventory = await db.Product.findAll({
        include: [
          {
            model: db.Stock,
            as: 'stock',
            attributes: ['id', 'quantity', 'location', 'updatedAt']
          }
        ],
        attributes: ['id', 'name', 'category', 'price']
      });

      const plainInventory = inventory.map(item => item.get({ plain: true }));
      return res.json(plainInventory);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  },

  
  createInventory: async (req, res) => {
    const { productId, quantity, location, note, userId } = req.body;
    try {
      const stock = await db.Stock.create({ productId, quantity, location, note });

      
      await db.InventoryLog.create({
        stockId: stock.id,
        userId: userId || null,
        change_type: 'create',
        quantity,
        note
      });

      return res.status(201).json({ message: 'Thêm tồn kho thành công', data: stock });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  },

  editInventory: async (req, res) => {
    const { id } = req.params;
    const { quantity, location, note, userId } = req.body;
    try {
      const stock = await db.Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ message: 'Không tìm thấy tồn kho' });
      }

      const oldQuantity = stock.quantity;

      await stock.update({ quantity, location, note });

      await db.InventoryLog.create({
        stockId: stock.id,
        userId: userId || null,
        change_type: 'update',
        quantity: quantity - oldQuantity, 
        note
      });

      return res.json({ message: 'Cập nhật tồn kho thành công', data: stock });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  },

  
  deleteInventory: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
      const stock = await db.Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ message: 'Không tìm thấy tồn kho' });
      }

      await db.Stock.destroy({ where: { id } });

      
      await db.InventoryLog.create({
        stockId: id,
        userId: userId || null,
        change_type: 'delete',
        quantity: -stock.quantity,
        note: 'Xóa tồn kho'
      });

      return res.json({ message: 'Xóa tồn kho thành công' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  }
};
