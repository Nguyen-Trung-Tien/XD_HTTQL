"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    static associate(models) {
      Suppliers.hasMany(models.ImportReceipts, {
        foreignKey: "supplierId",
        as: "importReceiptData",
      });
    }
  }
  Suppliers.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Suppliers",
    }
  );
  return Suppliers;
};
