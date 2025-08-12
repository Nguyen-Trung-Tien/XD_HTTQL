"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [
      {
        email: "nguyenvana@example.com",
        name: "Nguyễn Văn A",
        phoneNumber: "0901234567",
        address: "123 Lê Lợi, Hà Nội",
      },
      {
        email: "tranthib@example.com",
        name: "Trần Thị B",
        phoneNumber: "0912345678",
        address: "456 Trần Hưng Đạo, TP.HCM",
      },
      {
        email: "phamvanC@example.com",
        name: "Phạm Văn C",
        phoneNumber: "0923456789",
        address: "789 Nguyễn Huệ, Đà Nẵng",
      },
      {
        email: "lethid@example.com",
        name: "Lê Thị D",
        phoneNumber: "0934567890",
        address: "12 Hai Bà Trưng, Hải Phòng",
      },
      {
        email: "hoangvane@example.com",
        name: "Hoàng Văn E",
        phoneNumber: "0945678901",
        address: "34 Điện Biên Phủ, Cần Thơ",
      },
      {
        email: "dangthif@example.com",
        name: "Đặng Thị F",
        phoneNumber: "0956789012",
        address: "56 Võ Văn Kiệt, Nha Trang",
      },
      {
        email: "buivanG@example.com",
        name: "Bùi Văn G",
        phoneNumber: "0967890123",
        address: "78 Phạm Văn Đồng, Quy Nhơn",
      },
      {
        email: "phanthih@example.com",
        name: "Phan Thị H",
        phoneNumber: "0978901234",
        address: "90 Nguyễn Văn Cừ, Vũng Tàu",
      },
      {
        email: "ngothii@example.com",
        name: "Ngô Thị I",
        phoneNumber: "0989012345",
        address: "11 Pasteur, Huế",
      },
      {
        email: "trinhvanj@example.com",
        name: "Trịnh Văn J",
        phoneNumber: "0990123456",
        address: "22 Lý Thường Kiệt, Pleiku",
      },
      {
        email: "doanthik@example.com",
        name: "Doãn Thị K",
        phoneNumber: "0902345678",
        address: "33 Hùng Vương, Thái Nguyên",
      },
      {
        email: "nguyenthil@example.com",
        name: "Nguyễn Thị L",
        phoneNumber: "0913456789",
        address: "44 Hoàng Diệu, Thanh Hóa",
      },
      {
        email: "trinhvanm@example.com",
        name: "Trịnh Văn M",
        phoneNumber: "0924567890",
        address: "55 Quang Trung, Bắc Ninh",
      },
      {
        email: "lethingn@example.com",
        name: "Lê Thị N",
        phoneNumber: "0935678901",
        address: "66 Bạch Đằng, Đà Nẵng",
      },
      {
        email: "phamvuo@example.com",
        name: "Phạm Vũ O",
        phoneNumber: "0946789012",
        address: "77 Cách Mạng Tháng Tám, Biên Hòa",
      },
      {
        email: "dinhthip@example.com",
        name: "Đinh Thị P",
        phoneNumber: "0957890123",
        address: "88 Nguyễn Tri Phương, Buôn Ma Thuột",
      },
      {
        email: "buitriq@example.com",
        name: "Bùi Trí Q",
        phoneNumber: "0968901234",
        address: "99 Lê Duẩn, Kon Tum",
      },
      {
        email: "phanthir@example.com",
        name: "Phan Thị R",
        phoneNumber: "0979012345",
        address: "101 Lạc Long Quân, Quảng Ninh",
      },
      {
        email: "vothis@example.com",
        name: "Võ Thị S",
        phoneNumber: "0980123456",
        address: "202 Nguyễn Thái Học, Phú Yên",
      },
      {
        email: "nguyenvant@example.com",
        name: "Nguyễn Văn T",
        phoneNumber: "0991234567",
        address: "303 Phạm Hùng, Hà Nội",
      },
    ];

    const now = new Date();
    const customerData = customers.map((c) => ({
      ...c,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Customers", customerData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
