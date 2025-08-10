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
      ImportReceipt.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplierData",
      });

      ImportReceipt.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userData",
      });
      ImportReceipt.hasMany(models.ImportDetail, {
        foreignKey: "importId",
        as: "importDetails",
      });
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
