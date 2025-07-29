"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Shippers",
      [
        {
          name: "Thinh",
          phoneNumber: "0123456789",
          status: "delivering",
          lat: 10.8657,
          lng: 106.619,
          address:
            "Trường Đại học Giao thông Vận tải TP.HCM - Cơ sở 3, 70, Đường Tô Ký, Phường Trung Mỹ Tây, Thành phố Hồ Chí Minh, 71716, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ngân",
          phoneNumber: "0163254789",
          status: "available",
          lat: 10.8464,
          lng: 106.772,
          address:
            "Thủ Đức, Nguyễn Văn Bá, Khu phố 2, Phường Thủ Đức, Thành phố Hồ Chí Minh, 00848, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thành",
          phoneNumber: "0867 919 479",
          status: "available",
          lat: 10.8581,
          lng: 106.615,
          address:
            "Hà Đặc, Phường Trung Mỹ Tây, Thành phố Hồ Chí Minh, 71716, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Khánh",
          phoneNumber: "0123456785",
          status: "available",
          lat: 10.8092,
          lng: 106.673,
          address:
            "Chung cư Orchard Parkview Phú Nhuận, 130-132, Phường Đức Nhuận, Thành phố Hồ Chí Minh, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Minh",
          phoneNumber: "0123456987",
          status: "delivering",
          lat: 10.8243,
          lng: 106.686,
          address:
            "Gò Vấp, Phường Hạnh Thông, Thành phố Hồ Chí Minh, 71400, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tuấn",
          phoneNumber: "0369852147",
          status: "available",
          lat: 10.8613,
          lng: 106.664,
          address: "Quận 12, Thành phố Hồ Chí Minh, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Khang",
          phoneNumber: "0123658974",
          status: "available",
          lat: 10.7753,
          lng: 106.7,
          address: "Quận 1, Phường Bến Thành, Thành phố Hồ Chí Minh, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Phát",
          phoneNumber: "0123654879",
          status: "available",
          lat: 10.8614,
          lng: 106.611,
          address:
            "Nguyễn Ảnh Thủ, Xã Bà Điểm, Thành phố Hồ Chí Minh, 71716, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tiến",
          phoneNumber: "0231465897",
          status: "available",
          lat: 10.8425,
          lng: 106.774,
          address:
            "Đường Hai Bà Trưng, Khu phố 7, Phường Tăng Nhơn Phú, Thành phố Hồ Chí Minh, 00848, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nhật",
          phoneNumber: "0236514789",
          status: "available",
          lat: 10.8231,
          lng: 106.63,
          address:
            "Phan Huy ích, Phường Tây Thạnh, Thành phố Hồ Chí Minh, 71509, Việt Nam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
