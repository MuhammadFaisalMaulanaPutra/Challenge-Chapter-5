"use strict";
const { Model } = require("sequelize");
// const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      car.belongsTo(models.user, {
        as: "whosCreate", // ganti pk
        foreignKey: "whos_create",
      });
      car.belongsTo(models.user, {
        as: "whosUpdate",
        foreignKey: "whos_update",
      });
      car.belongsTo(models.user, {
        as: "whosDelete",
        foreignKey: "whos_delete",
      });
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
      whos_create: DataTypes.INTEGER,
      whos_update: DataTypes.INTEGER,
      whos_delete: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "car",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return car;
};
