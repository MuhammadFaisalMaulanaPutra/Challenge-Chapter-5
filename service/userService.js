const { user } = require("../models");

module.exports = {
  getDataAll,
  getDataByEmail,
  getDataById,
  getDataByIdWithAttr,
  getDataLatest,
  storeData,
};

async function getDataAll(attributes) {
  const data = await user.findAll({
    attributes: attributes,
  });

  return data;
}

async function getDataById(id) {
  const data = await user.findByPk(id);

  return data;
}

async function getDataByIdWithAttr(id, attributes) {
  const data = await user.findByPk(id, {
    attributes: attributes,
  });
  return data;
}

async function getDataByEmail(email) {
  const data = await user.findOne({
    where: {
      email: email,
    },
  });

  return data;
}

async function getDataLatest(attributes) {
  const data = await user.findOne({
    attributes: attributes,
    order: [["id", "DESC"]],
  });

  return data;
}

async function storeData(value) {
  await user.create({
    username: value.username,
    email: value.email,
    password: value.password,
    role: value.role,
  });

  return;
}
