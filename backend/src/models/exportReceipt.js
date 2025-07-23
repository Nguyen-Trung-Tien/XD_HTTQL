"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExportReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExportReceipt.init(
    {
      user_id: DataTypes.INTEGER,
      export_date: DataTypes.DATE,
      reason: DataTypes.TEXT,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ExportReceipt",
    }
  );
  return ExportReceipt;
};
