"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ImportDetails", [
      {
        id: 1,
        importId: 1,
        productId: 1,
        quantity: 100,
        price: "50000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        importId: 1,
        productId: 2,
        quantity: 50,
        price: "150000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        importId: 2,
        productId: 3,
        quantity: 30,
        price: "200000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ImportDetails", null, {});
  },
};
