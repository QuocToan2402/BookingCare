"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctor_infor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      provinceId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      addressClinic: {
        type: Sequelize.TEXT,
      },
      nameClinic: {
        type: Sequelize.TEXT,
      },
      note: {
        type: Sequelize.TEXT,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("doctor_infor");
  },
};
