"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImportDetail extends Model {
    static associate(models) {
      ImportDetail.belongsTo(models.ImportReceipt, {
        foreignKey: "importId",
        as: "importReceiptData",
      });

      ImportDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "productData",
      });
    }
  }
  ImportDetail.init(
    {
      importId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ImportDetail",
    }
  );
  return ImportDetail;
};
