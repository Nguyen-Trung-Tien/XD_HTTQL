"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [orders] = await queryInterface.sequelize.query(`SELECT id FROM Orders`);
    const [products] = await queryInterface.sequelize.query(`SELECT id, price FROM Products`);
    if (!orders.length || !products.length) return;

    const items = [];
    for (const order of orders) {
      
      const numItems = 1 + Math.floor(Math.random() * 2);
      const used = new Set();
      for (let i = 0; i < numItems; i++) {
        let product;
        do {
          product = products[Math.floor(Math.random() * products.length)];
        } while (used.has(product.id));
        used.add(product.id);

        items.push({
          orderId: order.id,
          productId: product.id,
          name: `SP ${product.id}`,
          price: Number(String(product.price).replace(/\D/g, "")) || 100000,
          quantity: 1 + Math.floor(Math.random() * 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    if (items.length) {
      await queryInterface.bulkInsert("OrderItems", items, {});
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderItems", null, {});
  },
};