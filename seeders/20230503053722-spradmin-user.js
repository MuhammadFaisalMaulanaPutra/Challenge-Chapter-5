"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    return await queryInterface.bulkInsert("users", [
      {
        username: "SuperAdmin_1",
        email: "superadmin_1@email.com",
        password: await bcrypt.hash("12345", salt),
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "SuperAdmin_2",
        email: "superadmin_2@email.com",
        password: await bcrypt.hash("12345", salt),
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
