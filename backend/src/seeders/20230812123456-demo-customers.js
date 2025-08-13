"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [
      {
        email: "nguyenvana@example.com",
        name: "Nguyễn Văn A",
        phoneNumber: "0901234567",
        status: "active",
        address: "123 Lê Lợi",
        city: "Hà Nội",
      },
      {
        email: "tranthib@example.com",
        name: "Trần Thị B",
        phoneNumber: "0912345678",
        status: "active",
        address: "456 Trần Hưng Đạo",
        city: "Hồ Chí Minh",
      },
      {
        email: "phamvanc@example.com",
        name: "Phạm Văn C",
        phoneNumber: "0923456789",
        status: "active",
        address: "789 Nguyễn Huệ",
        city: "Đà Nẵng",
      },
      {
        email: "lethid@example.com",
        name: "Lê Thị D",
        phoneNumber: "0934567890",
        status: "active",
        address: "12 Hai Bà Trưng",
        city: "Hải Phòng",
      },
      {
        email: "hoangvane@example.com",
        name: "Hoàng Văn E",
        phoneNumber: "0945678901",
        status: "active",
        address: "34 Điện Biên Phủ",
        city: "Cần Thơ",
      },
      {
        email: "dangthif@example.com",
        name: "Đặng Thị F",
        phoneNumber: "0956789012",
        status: "active",
        address: "56 Võ Văn Kiệt",
        city: "Nha Trang",
      },
      {
        email: "buivang@example.com",
        name: "Bùi Văn G",
        phoneNumber: "0967890123",
        status: "active",
        address: "78 Phạm Văn Đồng",
        city: "Quy Nhơn",
      },
      {
        email: "phanthih@example.com",
        name: "Phan Thị H",
        phoneNumber: "0978901234",
        status: "active",
        address: "90 Nguyễn Văn Cừ",
        city: "Vũng Tàu",
      },
      {
        email: "ngothii@example.com",
        name: "Ngô Thị I",
        phoneNumber: "0989012345",
        status: "active",
        address: "11 Pasteur",
        city: "Huế",
      },
      {
        email: "trinhvanj@example.com",
        name: "Trịnh Văn J",
        phoneNumber: "0990123456",
        status: "active",
        address: "22 Lý Thường Kiệt",
        city: "Pleiku",
      },
      {
        email: "doanthik@example.com",
        name: "Doãn Thị K",
        phoneNumber: "0902345678",
        status: "active",
        address: "33 Hùng Vương",
        city: "Thái Nguyên",
      },
      {
        email: "nguyenthil@example.com",
        name: "Nguyễn Thị L",
        phoneNumber: "0913456789",
        status: "active",
        address: "44 Hoàng Diệu",
        city: "Thanh Hóa",
      },
      {
        email: "trinhvanm@example.com",
        name: "Trịnh Văn M",
        phoneNumber: "0924567890",
        status: "active",
        address: "55 Quang Trung",
        city: "Bắc Ninh",
      },
      {
        email: "lethin@example.com",
        name: "Lê Thị N",
        phoneNumber: "0935678901",
        status: "active",
        address: "66 Bạch Đằng",
        city: "Đà Nẵng",
      },
      {
        email: "phamvuo@example.com",
        name: "Phạm Vũ O",
        phoneNumber: "0946789012",
        status: "active",
        address: "77 Cách Mạng Tháng Tám",
        city: "Biên Hòa",
      },
      {
        email: "dinhthip@example.com",
        name: "Đinh Thị P",
        phoneNumber: "0957890123",
        status: "active",
        address: "88 Nguyễn Tri Phương",
        city: "Buôn Ma Thuột",
      },
      {
        email: "buitriq@example.com",
        name: "Bùi Trí Q",
        phoneNumber: "0968901234",
        status: "inactive",
        address: "99 Lê Duẩn",
        city: "Hồ Chí Minh",
      },
      {
        email: "phanthir@example.com",
        name: "Phan Thị R",
        phoneNumber: "0979012345",
        status: "inactive",
        address: "101 Lạc Long Quân",
        city: "Quảng Ninh",
      },
      {
        email: "vothis@example.com",
        name: "Võ Thị S",
        phoneNumber: "0980123456",
        status: "inactive",
        address: "202 Nguyễn Thái Học",
        city: "Phú Yên",
      },
      {
        email: "nguyenvant@example.com",
        name: "Nguyễn Văn T",
        phoneNumber: "0991234567",
        status: "inactive",
        address: "303 Phạm Hùng",
        city: "Hà Nội",
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
