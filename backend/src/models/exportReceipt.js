"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExportReceipts extends Model {
    static associate(models) {
      ExportReceipts.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userData",
      });
      ExportReceipts.hasMany(models.ExportDetails, {
        foreignKey: "exportId",
        as: "exportDetailData",
      });
    }
  }
  ExportReceipts.init(
    {
      userId: DataTypes.INTEGER,
      export_date: DataTypes.DATE,
      reason: DataTypes.TEXT,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ExportReceipts",
    }
  );
  return ExportReceipts;
};
