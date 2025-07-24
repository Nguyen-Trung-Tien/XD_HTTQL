"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImportReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImportReceipt.init(
    {
      supplierId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      import_date: DataTypes.DATE,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ImportReceipt",
    }
  );
  return ImportReceipt;
};
