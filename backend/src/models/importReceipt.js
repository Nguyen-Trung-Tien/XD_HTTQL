"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImportReceipts extends Model {
    static associate(models) {
      ImportReceipts.belongsTo(models.Suppliers, {
        foreignKey: "supplierId",
        as: "supplierData",
      });
      ImportReceipts.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userData",
      });

      ImportReceipts.hasMany(models.ImportDetails, {
        foreignKey: "importId",
        as: "importDetailData",
      });
    }
  }
  ImportReceipts.init(
    {
      supplierId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      import_date: DataTypes.DATE,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ImportReceipts",
    }
  );
  return ImportReceipts;
};
