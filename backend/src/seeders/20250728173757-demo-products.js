'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [{
        name: 'Điện thoại Samsung Galaxy S23',
        type: 'Điện thoại',
        price: '22.990.000',
        stock: 12,
        image: '',
        category: 'Điện tử',
        unit: 'chiếc',
        status: 'Còn hàng',
        description: 'Smartphone cao cấp với camera sắc nét, màn hình AMOLED 120Hz và chip Snapdragon mạnh mẽ.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Laptop Dell XPS 13',
        type: 'Laptop',
        price: '34.990.000',
        stock: 62,
        image: '',
        category: 'Điện tử',
        unit: 'chiếc',
        status: 'Còn hàng',
        description: 'Laptop mỏng nhẹ, thiết kế tinh tế, hiệu năng cao phù hợp cho công việc và học tập.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tai nghe Bluetooth Sony WH-1000XM5',
        type: 'Tai nghe',
        price: '8.490.000',
        stock: 32,
        image: '',
        category: 'Điện tử',
        unit: 'chiếc',
        status: 'Hết hàng',
        description: 'Tai nghe chống ồn chủ động hàng đầu, âm thanh chất lượng cao, thời lượng pin lên đến 30 giờ.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Máy ảnh Canon EOS M50 Mark II',
        type: 'Máy ảnh',
        price: '17.500.000',
        stock: 52,
        image: '',
        category: 'Điện tử',
        unit: 'chiếc',
        status: 'Còn hàng',
        description: 'Máy ảnh mirrorless nhỏ gọn, phù hợp quay vlog và chụp ảnh chất lượng cao.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tivi LG OLED 55 inch',
        type: 'Tivi',
        price: '27.990.000',
        stock: 33,
        image: '',
        category: 'Điện tử',
        unit: 'chiếc',
        status: 'Còn hàng',
        description: 'Màn hình OLED 4K sắc nét, âm thanh vòm sống động, hỗ trợ các nền tảng thông minh.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Loa Bluetooth JBL Charge 5',
        type: 'Loa',
        price: '3.690.000',
        stock: 13,
        image: '',
        category: 'Điện tử',
        unit: 'chiếc',
        status: 'Hết hàng',
        description: 'Loa di động chống nước, pin 20 giờ, âm thanh mạnh mẽ và bass sâu.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {}
};