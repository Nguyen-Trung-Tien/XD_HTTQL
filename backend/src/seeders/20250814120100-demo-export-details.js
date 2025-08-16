"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ExportDetails", [
      {
        exportId: 1,
        productId: 1,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 1,
        productId: 2,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 2,
        productId: 1,
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 2,
        productId: 3,
        quantity: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 3,
        productId: 4,
        quantity: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 3,
        productId: 5,
        quantity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 4,
        productId: 2,
        quantity: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 4,
        productId: 6,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 5,
        productId: 7,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 5,
        productId: 1,
        quantity: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 6,
        productId: 8,
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 6,
        productId: 3,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 7,
        productId: 4,
        quantity: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 7,
        productId: 5,
        quantity: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 8,
        productId: 2,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 8,
        productId: 6,
        quantity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 9,
        productId: 7,
        quantity: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 9,
        productId: 8,
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 10,
        productId: 1,
        quantity: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exportId: 10,
        productId: 3,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ExportDetails", null, {});
  },
};
