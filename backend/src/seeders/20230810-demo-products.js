"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Gạo ST25",
        type: "Thực phẩm",
        price: "25000",
        stock: 100,
        image: "gao-st25.jpg",
        category: "Gạo",
        unit: "kg",
        status: "available",
        description: "Gạo ngon nhất thế giới",
        warehouseAddress: "Kho Hà Nội",
        warehouseLat: 21.0278,
        warehouseLng: 105.8342,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nước suối Lavie",
        type: "Đồ uống",
        price: "5000",
        stock: 200,
        image: "lavie.jpg",
        category: "Nước uống",
        unit: "chai",
        status: "available",
        description: "Nước suối tinh khiết",
        warehouseAddress: "Kho HCM",
        warehouseLat: 10.7769,
        warehouseLng: 106.7009,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
