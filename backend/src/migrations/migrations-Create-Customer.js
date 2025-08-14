"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      phoneNumber: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING, defaultValue: "active" },
       lat: { type: Sequelize.FLOAT },
      lng: { type: Sequelize.FLOAT }, 
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Customers");
  },
};
