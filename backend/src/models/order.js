"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem, { foreignKey: "orderId", as: "items" });
       Order.hasMany(models.OrderItem, { foreignKey: "orderId", as: "orderitems" });
      Order.belongsTo(models.Shipper, {
        foreignKey: "shipperId",
        as: "shipper",
      });
      Order.belongsTo(models.Customers, {
        foreignKey: "customerId",
        as: "customer",
      });
    }
  }

  Order.init(
    {
      orderNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      customerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      shippingLat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      shippingLng: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shippingFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shippedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shipperId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
    }
  );

  return Order;
};
