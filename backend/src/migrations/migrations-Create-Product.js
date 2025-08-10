"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      category: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      warehouseAddress: {
        type: Sequelize.STRING,
        defaultValue: "70 Tô Ký, Quận 12, TP.HCM",
      },
      warehouseLat: {
        type: Sequelize.FLOAT,
        defaultValue: 10.8657,
      },
      warehouseLng: {
        type: Sequelize.FLOAT,
        defaultValue: 106.619,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
