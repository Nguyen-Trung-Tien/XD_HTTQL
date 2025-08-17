"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InventoryLog extends Model {

    static associate(models) {
      
      InventoryLog.belongsTo(models.Stock, {
        foreignKey: "stockId",
        as: "stock"
      });

      InventoryLog.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
    }
  }

  InventoryLog.init(
    {
      stockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Stocks",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "SET NULL"
      },
      change_type: {
        type: DataTypes.ENUM("create", "update", "delete", "import", "export"),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "InventoryLog",
      tableName: "inventory_logs",
      timestamps: true
    }
  );

  return InventoryLog;
};
