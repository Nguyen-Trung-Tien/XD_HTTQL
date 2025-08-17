"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product"
      });
      Stock.hasMany(models.InventoryLog, {
        foreignKey: "stockId",
        as: "logs"
      });
    }
  }
  Stock.init(
    {
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      location: DataTypes.STRING,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Stock",
    }
  );
  return Stock;
};
