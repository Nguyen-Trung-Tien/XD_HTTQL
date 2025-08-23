const { Order, OrderItem } = require('../models');
const { Sequelize } = require('sequelize');

const getTotalRevenue = async (req, res) => {
  try {

    const result = await OrderItem.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.literal('price * quantity')), 'totalProduct']
      ]
    });
    const shipResult = await Order.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('shippingFee')), 'totalShip']
      ]
    });
    const totalProduct = Number(result[0].dataValues.totalProduct) || 0;
    const totalShip = Number(shipResult[0].dataValues.totalShip) || 0;
    res.json({ totalRevenue: totalProduct + totalShip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTotalRevenue };