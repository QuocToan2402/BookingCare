"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HandBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      HandBook.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  HandBook.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HandBook",
    }
  );
  return HandBook;
};
