"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("handbooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("handbooks");
  },
};
