'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [{
        name: 'Điện thoại X Pro',
        type: 'Điện thoại',
        category: 'Điện tử',
        price: 2350000,
        code: 'XP001',
        image: '',
        unit: 'Chiếc',
        status: 'Còn hàng',
        supplierId: 1,
        description: 'Điện thoại cao cấp với hiệu năng mạnh mẽ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Laptop Ultra Pro',
        type: 'Laptop',
        category: 'Điện tử',
        price: 35990000,
        code: 'LP001',
        image: '',
        unit: 'Chiếc',
        status: 'Còn hàng',
        supplierId: 2,
        description: 'Laptop chuyên nghiệp cho công việc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tai nghe không dây',
        type: 'Phụ kiện',
        category: 'Phụ kiện',
        price: 2300000,
        code: 'TN001',
        image: '',
        unit: 'Chiếc',
        status: 'Hết hàng',
        supplierId: 3,
        description: 'Tai nghe không dây cao cấp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Đồng hồ thông minh',
        type: 'Đồng hồ',
        category: 'Thiết bị đeo',
        price: 5990000,
        code: 'DH001',
        image: '',
        unit: 'Chiếc',
        status: 'Sắp hết',
        supplierId: 4,
        description: 'Đồng hồ thông minh đa năng',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {}
};