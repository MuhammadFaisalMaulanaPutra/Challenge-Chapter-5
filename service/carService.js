const { car } = require("../models");

module.exports = {
  getAllData,
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
    },
    {
      where: {
        id,
      },
    }
  );

  return;
}

async function destroyData(id) {
  await car.destroy({
    where: {
      id,
    },
  });

  return;
}
