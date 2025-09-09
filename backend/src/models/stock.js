"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      Stock.hasMany(models.InventoryLog, {
        foreignKey: "stockId",
        as: "logs",
      });

      Stock.hasMany(models.ImportDetails, {
        foreignKey: "productId",
        as: "importDetailData",
      });
      Stock.hasMany(models.ExportDetails, {
        foreignKey: "productId",
        as: "exportDetailData",
      });
    }
  }
  Stock.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      category: DataTypes.STRING,
      unit: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,
      warehouseAddress: DataTypes.STRING,
      warehouseLat: DataTypes.FLOAT,
      warehouseLng: DataTypes.FLOAT,
      note: DataTypes.TEXT,
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
