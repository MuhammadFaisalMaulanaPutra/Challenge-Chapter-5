"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.car, {
        as: "whosCreate",
        foreignKey: "whos_create",
      });
      user.hasMany(models.car, {
        as: "whosUpdate",
        foreignKey: "whos_update",
      });
      user.hasMany(models.car, {
        as: "whosDelete",
        foreignKey: "whos_delete",
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
