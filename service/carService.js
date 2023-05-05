const { car, user } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAllData,
  getAllDataAvailable,
  getAllDataDeleted,
  getDataById,
  getLatestData,
  storeData,
  updateData,
  destroyData,
};

async function getAllData() {
  const data = await car.findAll({
    attributes: {
      exclude: [
        "whos_create",
        "whos_update",
        "whos_delete",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: user,
        as: "whosCreate",
        attributes: ["id", "username", "role"],
      },
      {
        model: user,
        as: "whosUpdate",
        attributes: ["id", "username", "role"],
      },
      {
        model: user,
        as: "whosDelete",
        attributes: ["id", "username", "role"],
      },
    ],
  });

  return data;
}

async function getAllDataAvailable() {
  const data = await car.findAll({
    attributes: [
      "id",
      "plate",
      "model",
      "manufacture",
      "capacity",
      "year",
      "transmission",
    ],
    where: {
      available: true,
    },
    order: [["id", "ASC"]],
  });

  return data;
}

async function getAllDataDeleted() {
  const data = await car.findAll({
    attributes: [
      "id",
      "plate",
      "model",
      "manufacture",
      "capacity",
      "year",
      "transmission",
    ],
    order: [["id", "ASC"]],
    where: {
      whos_delete: {
        [Op.not]: null,
      },
    },

    include: [
      {
        model: user,
        as: "whosCreate",
        attributes: ["id", "username", "role"],
      },
      {
        model: user,
        as: "whosUpdate",
        attributes: ["id", "username", "role"],
      },
      {
        model: user,
        as: "whosDelete",
        attributes: ["id", "username", "role"],
      },
    ],
    paranoid: false,
  });

  return data;
}

async function getDataById(id) {
  const data = await car.findByPk(id);

  return data;
}

async function getLatestData() {
  const data = await car.findOne({
    attributes: {
      exclude: [
        "whos_create",
        "whos_update",
        "whos_delete",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: user,
        as: "whosCreate",
        attributes: ["id", "username", "role"],
      },
      {
        model: user,
        as: "whosUpdate",
        attributes: ["id", "username", "role"],
      },
      {
        model: user,
        as: "whosDelete",
        attributes: ["id", "username", "role"],
      },
    ],
  });

  return data;
}

async function storeData(value) {
  await car.create({
    plate: value.plate,
    model: value.model,
    manufacture: value.manufacture,
    capacity: value.capacity,
    year: value.year,
    transmission: value.transmission,
    available: value.available,
    whos_create: value.whos_create,
    whos_update: value.whos_create,
  });

  return;
}

async function updateData(id, value) {
  await car.update(
    {
      plate: value.plate,
      model: value.model,
      manufacture: value.manufacture,
      capacity: value.capacity,
      year: value.year,
      transmission: value.transmission,
      available: value.available,
      whos_update: value.whos_update,
    },
    {
      where: {
        id,
      },
    }
  );

  return;
}

async function destroyData(id, value) {
  await car.update(
    {
      whos_delete: value,
    },
    {
      where: {
        id,
      },
    }
  );

  await car.destroy({
    where: {
      id,
    },
  });

  return;
}
