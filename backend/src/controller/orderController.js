const db = require("../models");

const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, items, shipperId, warehouseId } = req.body;
    const order = await db.Order.create({
      orderNumber: "DH-" + Date.now(),
      customerName,
      customerPhone,
      customerAddress,
      status: "pending",
      total: 0, 
      shipperId,
    });
    res.status(201).json({ message: "Order created", data: order });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, shipperId } = req.body;
    const [updated] = await db.Order.update({ status, shipperId }, { where: { id } });
    if (updated) {
      const updatedOrder = await db.Order.findByPk(id);
      res.status(200).json({ message: "Order updated", data: updatedOrder });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to update order", error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Order.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Order deleted" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};