"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clinics", {
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
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },

      doctorID: {
        type: Sequelize.INTEGER,
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT,
      },

      descriptionHTML: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.BLOB("long"),
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
    await queryInterface.dropTable("clinics");
  },
};
