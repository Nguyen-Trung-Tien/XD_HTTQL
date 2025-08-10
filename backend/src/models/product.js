"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ImportDetails, {
        foreignKey: "productId",
        as: "importDetailData",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      category: DataTypes.STRING,
      unit: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,
      warehouseAddress: DataTypes.STRING,
      warehouseLat: DataTypes.FLOAT,
      warehouseLng: DataTypes.FLOAT,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
