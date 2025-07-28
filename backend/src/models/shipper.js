"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipper extends Model {
    static associate(models) {
      // define association 
    }
  }
  Shipper.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      status: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shipper",
    }
  );
  return Shipper;
};