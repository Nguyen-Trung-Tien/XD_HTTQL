'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    orderNumber: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    customerAddress: DataTypes.STRING,
    status: DataTypes.STRING,
    total: DataTypes.FLOAT,
    shippedAt: DataTypes.DATE,
    deliveredAt: DataTypes.DATE,
    shipperId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};