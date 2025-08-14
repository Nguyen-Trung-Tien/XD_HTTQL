"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ExportDetails", [
      {
        exportId: 1, // tham chiếu tới ExportReceipts id=1
        productId: 1, // giả sử productId=1 tồn tại
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
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ExportDetails", null, {});
  },
};
