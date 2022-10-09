"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bookings", {
      // statusID: DataTypes.STRING,
      // doctorID: DataTypes.INTEGER,
      // patientID: DataTypes.INTEGER,
      // date: DataTypes.DATE,
      // date: DataTypes.BOOLEAN,
      // timeType: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statusID: {
        type: Sequelize.STRING,
      },
      doctorID: {
        type: Sequelize.INTEGER,
      },
      patientID: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      timeType: {
        type: Sequelize.STRING,
      },
      token: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("bookings");
  },
};
