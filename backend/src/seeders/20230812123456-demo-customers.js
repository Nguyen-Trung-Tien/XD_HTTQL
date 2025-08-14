"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Customers", [
      // 2024
      {
        email: "nguyenvana@example.com",
        name: "Nguyễn Văn A",
        phoneNumber: "0901234567",
        address: "Lê Lợi, Khu phố 8, Phường Sài Gòn",

        lat: 10.774,
        lng: 106.7,
        createdAt: new Date("2024-01-05T08:00:00Z"),
        updatedAt: new Date("2024-01-06T10:00:00Z"),
      },
      {
        email: "tranthib@example.com",
        name: "Trần Thị B",
        phoneNumber: "0912345678",
        address: "Trần Hưng Đạo, Cầu Ông Lãnh",

        lat: 10.7628,
        lng: 106.691,
        createdAt: new Date("2024-02-10T09:30:00Z"),
        updatedAt: new Date("2024-02-11T11:45:00Z"),
      },
      {
        email: "phamvanc@example.com",
        name: "Phạm Văn C",
        phoneNumber: "0923456789",
        address: "Nguyễn Huệ, Khu phố 6",

        lat: 10.7759,
        lng: 106.701,
        createdAt: new Date("2024-03-15T07:15:00Z"),
        updatedAt: new Date("2024-03-16T09:00:00Z"),
      },
      {
        email: "lethid@example.com",
        name: "Lê Thị D",
        phoneNumber: "0934567890",
        address: "Hai Bà Trưng, Khu phố 2",

        lat: 10.7808,
        lng: 106.7,
        createdAt: new Date("2024-04-20T10:00:00Z"),
        updatedAt: new Date("2024-04-21T12:30:00Z"),
      },
      {
        email: "hoangvane@example.com",
        name: "Hoàng Văn E",
        phoneNumber: "0945678901",
        address: "Điện Biên Phủ, Phường Gia Định",

        lat: 10.7982,
        lng: 106.705,
        createdAt: new Date("2024-05-05T08:45:00Z"),
        updatedAt: new Date("2024-05-06T09:30:00Z"),
      },
      {
        email: "dangthif@example.com",
        name: "Đặng Thị F",
        phoneNumber: "0956789012",
        address: "Võ Văn Kiệt, Phường Chợ Lớn",

        lat: 10.7479,
        lng: 106.657,
        createdAt: new Date("2024-06-12T07:00:00Z"),
        updatedAt: new Date("2024-06-13T08:15:00Z"),
      },
      {
        email: "buivang@example.com",
        name: "Bùi Văn G",
        phoneNumber: "0967890123",
        address: "Phạm Văn Đồng, Khu phố 13",

        lat: 10.8354,
        lng: 106.73,
        createdAt: new Date("2024-07-18T09:00:00Z"),
        updatedAt: new Date("2024-07-19T10:30:00Z"),
      },
      {
        email: "phanthih@example.com",
        name: "Phan Thị H",
        phoneNumber: "0978901234",
        address: "Nguyễn Văn Cừ, Cầu Ông Lãnh",

        lat: 10.7632,
        lng: 106.683,
        createdAt: new Date("2024-08-05T08:00:00Z"),
        updatedAt: new Date("2024-08-06T09:00:00Z"),
      },
      {
        email: "ngothii@example.com",
        name: "Ngô Thị I",
        phoneNumber: "0989012345",
        address: "Pasteur, Khu phố 14",

        lat: 10.8391,
        lng: 106.767,
        createdAt: new Date("2024-09-10T07:30:00Z"),
        updatedAt: new Date("2024-09-11T08:45:00Z"),
      },
      {
        email: "trinhvanj@example.com",
        name: "Trịnh Văn J",
        phoneNumber: "0990123456",
        address: "Lý Thường Kiệt, Diên Hồng",

        lat: 10.7741,
        lng: 106.657,
        createdAt: new Date("2024-10-15T08:15:00Z"),
        updatedAt: new Date("2024-10-16T09:30:00Z"),
      },

      // 2025
      {
        email: "doanthik@example.com",
        name: "Doãn Thị K",
        phoneNumber: "0902345678",
        address: "Hùng Vương, An Đông",

        lat: 10.7594,
        lng: 106.672,
        createdAt: new Date("2025-01-08T07:00:00Z"),
        updatedAt: new Date("2025-01-09T08:00:00Z"),
      },
      {
        email: "nguyenthil@example.com",
        name: "Nguyễn Thị L",
        phoneNumber: "0913456789",
        address: "Hoàng Diệu, Phường Khánh Hội",

        lat: 10.7626,
        lng: 106.703,
        createdAt: new Date("2025-02-14T09:30:00Z"),
        updatedAt: new Date("2025-02-15T10:45:00Z"),
      },
      {
        email: "trinhvanm@example.com",
        name: "Trịnh Văn M",
        phoneNumber: "0924567890",
        address: "Quang Trung, Phường Gò Vấp",

        lat: 10.8314,
        lng: 106.669,
        createdAt: new Date("2025-03-20T08:15:00Z"),
        updatedAt: new Date("2025-03-21T09:30:00Z"),
      },
      {
        email: "lethin@example.com",
        name: "Lê Thị N",
        phoneNumber: "0935678901",
        address: "Bạch Đằng, Phường Tân Sơn Hòa",

        lat: 10.8162,
        lng: 106.67,
        createdAt: new Date("2025-04-25T07:45:00Z"),
        updatedAt: new Date("2025-04-26T09:00:00Z"),
      },
      {
        email: "phamvuo@example.com",
        name: "Phạm Vũ O",
        phoneNumber: "0946789012",
        address: "Cách Mạng Tháng 8, Nhiêu Lộc",

        lat: 10.7817,
        lng: 106.674,
        createdAt: new Date("2025-05-12T08:30:00Z"),
        updatedAt: new Date("2025-05-13T10:00:00Z"),
      },
      {
        email: "dinhthip@example.com",
        name: "Đinh Thị P",
        phoneNumber: "0957890123",
        address: "Nguyễn Tri Phương, Diên Hồng",

        lat: 10.7657,
        lng: 106.668,
        createdAt: new Date("2025-06-18T07:15:00Z"),
        updatedAt: new Date("2025-06-19T08:30:00Z"),
      },
      {
        email: "buitriq@example.com",
        name: "Bùi Trí Q",
        phoneNumber: "0968901234",
        address: "Lê Duẩn, Khu phố 2",

        lat: 10.7842,
        lng: 106.702,
        createdAt: new Date("2025-07-22T09:00:00Z"),
        updatedAt: new Date("2025-07-23T10:30:00Z"),
      },
      {
        email: "phanthir@example.com",
        name: "Phan Thị R",
        phoneNumber: "0979012345",
        address: "Lạc Long Quân, Minh Phụng",

        lat: 10.7584,
        lng: 106.637,
        createdAt: new Date("2025-08-28T08:00:00Z"),
        updatedAt: new Date("2025-08-29T09:15:00Z"),
      },
      {
        email: "vothis@example.com",
        name: "Võ Thị S",
        phoneNumber: "0980123456",
        address: "Nguyễn Thái Học, Khu phố 7",

        lat: 10.7665,
        lng: 106.696,
        createdAt: new Date("2025-09-05T07:30:00Z"),
        updatedAt: new Date("2025-09-06T08:45:00Z"),
      },
      {
        email: "nguyenvant@example.com",
        name: "Nguyễn Văn T",
        phoneNumber: "0991234567",
        address: "Phạm Hùng, Xã Bình Hưng",

        lat: 10.7327,
        lng: 106.674,
        createdAt: new Date("2025-10-10T08:15:00Z"),
        updatedAt: new Date("2025-10-11T09:30:00Z"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
