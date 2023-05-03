const { car } = require("../models");

module.exports = {
  getAllData,
  getAllDataAvailable,
  getAllDataWithDeleted,
  getDataById,
  getLatestData,
  storeData,
  updateData,
  destroyData,
};

async function getAllData() {
  const data = await car.findAll({
    order: [["id", "ASC"]],
  });

  return data;
}

async function getAllDataAvailable() {
  const data = await car.findAll({
    where: {
      available: true,
    },
    order: [["id", "ASC"]],
  });

  return data;
}

async function getAllDataWithDeleted() {
  const data = await car.findAll({
    order: [["id", "ASC"]],
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
    order: [["id", "DESC"]],
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
    whosCreate: value.whosCreate,
    whosUpdate: value.whosCreate,
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
      whosUpdate: value.whosUpdate,
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
      whosDelete: value,
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
