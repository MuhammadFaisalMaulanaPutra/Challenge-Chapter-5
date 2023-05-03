"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      manufacture: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      transmission: {
        type: Sequelize.STRING,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      whosCreate: {
        type: Sequelize.STRING,
      },
      whosUpdate: {
        type: Sequelize.STRING,
      },
      whosDelete: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cars");
  },
};
