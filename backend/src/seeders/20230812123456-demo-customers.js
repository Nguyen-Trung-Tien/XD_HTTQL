"use strict";

function randomName() {
  const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Đặng", "Bùi", "Phan", "Vũ", "Đỗ"];
  const lastNames = ["Văn A", "Thị B", "Văn C", "Thị D", "Văn E", "Thị F", "Văn G", "Thị H", "Thị I", "Văn J"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function randomEmail(name, index) {
  return name.toLowerCase().replace(/\s+/g, "") + index + "@example.com";
}

function randomPhone() {
  return "09" + Math.floor(10000000 + Math.random() * 90000000);
}

function randomLatLng() {
  const lat = 10.7 + Math.random() * 0.15;
  const lng = 106.6 + Math.random() * 0.15;
  return { lat, lng };
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [];
    for (let i = 1; i <= 50; i++) {
      const name = randomName();
      const email = randomEmail(name, i);
      const phoneNumber = randomPhone();
      const { lat, lng } = randomLatLng();
      customers.push({
        id: i,
        name,
        email,
        phoneNumber,
        address: `Đường số ${i}, Quận ${1 + (i % 10)}, TP.HCM`,
        lat,
        lng,
        createdAt: new Date("2024-01-01T08:00:00Z"),
        updatedAt: new Date("2024-01-02T08:00:00Z"),
      });
    }
    await queryInterface.bulkInsert("Customers", customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
