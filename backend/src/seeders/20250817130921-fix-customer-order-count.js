"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Đếm số đơn của từng customer
    const [results] = await queryInterface.sequelize.query(`
      SELECT customerId, COUNT(*) as count
      FROM Orders
      GROUP BY customerId
    `);

    for (const row of results) {
      await queryInterface.bulkUpdate(
        "Customers",
        { orderCount: row.count },
        { id: row.customerId }
      );
    }
  },
  async down() {
    
  },
};