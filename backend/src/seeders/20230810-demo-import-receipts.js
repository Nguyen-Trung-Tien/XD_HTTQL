"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa dữ liệu cũ trước
    await queryInterface.bulkDelete("ImportReceipts", null, {});

    // Tạo thời gian ngẫu nhiên từ 2024 đến 9/2025
    const generateRandomDate = () => {
      const startDate = new Date("2024-01-01");
      const endDate = new Date("2025-09-30");
      const randomTime =
        startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime());
      return new Date(randomTime);
    };

    // Tạo note khớp với thời gian
    const generateNote = (date) => {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `Nhập hàng tháng ${month}/${year}`;
    };

    // Tạo dữ liệu với thời gian và note khớp nhau
    const receipts = [];
    for (let i = 1; i <= 15; i++) {
      const randomDate = generateRandomDate();
      const note = generateNote(randomDate);

      receipts.push({
        id: i,
        supplierId: (i % 3) + 1, 
        userId: (i % 3) + 1, 
        import_date: randomDate,
        note: note,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("ImportReceipts", receipts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ImportReceipts", null, {});
  },
};
