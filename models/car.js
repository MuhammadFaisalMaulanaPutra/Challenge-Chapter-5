"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init(
    {
      plate: DataTypes.STRING,
      model: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      transmission: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "car",
    }
  );
  return car;
};
