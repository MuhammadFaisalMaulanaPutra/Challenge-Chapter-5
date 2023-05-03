"use strict";

const bcrypt = require("bcrypt");
const makePassword = (pw) => {
  return new Promise(async (rs) => {
    let salt, hash;
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(pw, salt);
    return rs(hash);
  });
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let password = await makePassword("12345");
    return queryInterface.bulkInsert("users", [
      {
        username: "SuperAdmin_1",
        email: "superadmin_1@email.com",
        password: password,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "SuperAdmin_2",
        email: "superadmin_2@email.com",
        password: password,
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
