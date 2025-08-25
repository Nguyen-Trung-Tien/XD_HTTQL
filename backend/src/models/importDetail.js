"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImportDetails extends Model {
    static associate(models) {
      ImportDetails.belongsTo(models.ImportReceipts, {
        foreignKey: "importId",
        as: "importReceiptData",
      });

      ImportDetails.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "productData",
      });
    }
  }

  ImportDetails.init(
    {
      importId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ImportDetails",
    }
  );
  return ImportDetails;
};
