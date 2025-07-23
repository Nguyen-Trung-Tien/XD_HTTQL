"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InventoryLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryLog.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      change_type: DataTypes.STRING,
      quantity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InventoryLog",
    }
  );
  return InventoryLog;
};
