"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ImportReceipts", [
      {
        id: 1,
        supplierId: 1,
        userId: 1,
        import_date: new Date(),
        note: "Nhập hàng tháng 8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        supplierId: 2,
        userId: 2,
        import_date: new Date(),
        note: "Nhập hàng tháng 9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ImportReceipts", null, {});
  },
};
