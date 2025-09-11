"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa dữ liệu cũ trước
    await queryInterface.bulkDelete("ImportDetails", null, {});

    // Tạo dữ liệu import details khớp với 15 receipts
    const details = [];
    const products = [1, 2, 3, 4, 5, 6]; // Các productId có sẵn
    const prices = ["50000", "150000", "200000", "120000", "80000", "220000"];

    for (let i = 1; i <= 15; i++) {
      const productIndex = (i - 1) % products.length;
      const quantity = Math.floor(Math.random() * 100) + 10; // 10-110

      details.push({
        id: i,
        importId: i,
        productId: products[productIndex],
        quantity: quantity,
        price: prices[productIndex],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("ImportDetails", details);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ImportDetails", null, {});
  },
};
