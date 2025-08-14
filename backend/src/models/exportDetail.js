"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExportDetails extends Model {
    static associate(models) {
      ExportDetails.belongsTo(models.ExportReceipts, {
        foreignKey: "exportId",
        as: "exportReceiptData",
      });
      ExportDetails.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "productData",
      });
    }
  }
  ExportDetails.init(
    {
      exportId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExportDetails",
    }
  );
  return ExportDetails;
};
