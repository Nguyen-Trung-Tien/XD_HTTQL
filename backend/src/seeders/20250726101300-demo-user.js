"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin1@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Admin",
        lastName: "admin",
        role: "admin",
        status: "Hoạt động",
        gender: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user1@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Nguyen",
        lastName: "Van A",
        role: "Nhân viên",
        status: "Hoạt động",
        gender: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user2@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Tran",
        lastName: "Thi B",
        role: "Kế toán",
        status: "Hoạt động",
        gender: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user3@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Le",
        lastName: "Van C",
        role: "Nhân viên",
        status: "Hoạt động",
        gender: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user4@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Pham",
        lastName: "Thi D",
        role: "Kế toán",
        status: "Hoạt động",
        gender: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user5@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Hoang",
        lastName: "Van E",
        role: "Nhân viên",
        status: "Bị khóa",
        gender: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user6@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Dang",
        lastName: "Thi F",
        role: "Nhân viên",
        status: "Hoạt động",
        gender: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user7@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Bui",
        lastName: "Van G",
        role: "Kế toán",
        status: "Hoạt động",
        gender: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user8@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Nguyen",
        lastName: "Thi H",
        role: "Nhân viên",
        status: "Hoạt động",
        gender: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user9@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Le",
        lastName: "Van I",
        role: "Nhân viên",
        status: "Hoạt động",
        gender: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user10@gmail.com",
        password:
          "$2b$10$vVjoc5WCGt8wjLTwVHf.v.91wLaoWUqaC9EY0A/dAkFMif/r.pRGm",
        firstName: "Pham",
        lastName: "Thi J",
        role: "Kế toán",
        status: "Hoạt động",
        gender: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
