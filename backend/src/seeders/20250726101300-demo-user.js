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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
