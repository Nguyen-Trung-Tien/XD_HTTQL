"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      // Quan hệ với Product
      Stock.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product"
      });
      // Quan hệ với InventoryLog
      Stock.hasMany(models.InventoryLog, {
        foreignKey: "stockId",
        as: "logs"
      });
    }
  }
  Stock.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      

      // thêm các field tham chiếu từ Product
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      category: DataTypes.STRING,
      unit: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,

    // quản lý tồn kho
    
      note: DataTypes.TEXT,

      // cờ xoá
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Stock",
    }
  );
  return Stock;
};
