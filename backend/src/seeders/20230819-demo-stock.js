"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Stocks", [
      {
        productId: 1,
        quantity: 100,
        location: "Kho Hà Nội",
        note: "Nhập lô đầu tiên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 200,
        location: "Kho HCM",
        note: "Nhập lô tháng 8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        quantity: 150,
        location: "Kho Hà Nội",
        note: "Hàng bán chạy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        quantity: 0,
        location: "Kho HCM",
        note: "Còn ít hàng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        quantity: 1,
        location: "Kho Hà Nội",
        note: "Mới nhập sáng nay",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stocks", null, {});
  },
};
