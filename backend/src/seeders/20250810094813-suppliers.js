"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Supplier", [
      {
        name: "Nhà cung cấp A",
        phone: "0901234567",
        address: "Hà Nội",
        image: "supplier-a.jpg",
        description: "Chuyên cung cấp thực phẩm",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nhà cung cấp B",
        phone: "0907654321",
        address: "TP.HCM",
        image: "supplier-b.jpg",
        description: "Chuyên cung cấp đồ uống",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Supplier", null, {});
  },
};
