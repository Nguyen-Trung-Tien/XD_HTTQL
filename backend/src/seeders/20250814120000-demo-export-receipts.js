"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ExportReceipts", [
      {
        userId: 1,
        export_date: new Date(),
        reason: "Xuất hàng để giao khách",
        note: "Giao gấp trong ngày",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        export_date: new Date(),
        reason: "Xuất hàng chuyển kho",
        note: "Chuyển sang kho chi nhánh B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ExportReceipts", null, {});
  },
};
