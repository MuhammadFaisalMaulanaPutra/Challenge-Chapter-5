const CarService = require("../service/carService");

module.exports = {
  async list(req, res) {
    const list = await CarService.getAllData();

    res.status(200).json({
      status: 200,
      message: "List data already to use",
      data: list,
    });
  },

  async available_list(req, res) {
    const list = await CarService.getAllDataAvailable();

    res.status(200).json({
      status: 200,
      message: "List data already to use",
      data: list,
    });
  },

  async list_deleted(req, res) {
    const list = await CarService.getAllDataDeleted();

    res.status(200).json({
      status: 200,
      message: "List data already to use",
      data: list,
    });
  },

  async store(req, res) {
    const value = req.body;
    value.whos_create = req.user.id;

    await CarService.storeData(value);

    const data = await CarService.getLatestData();

    res.status(201).json({
      status: 201,
      message: "Data Creation was Succesfully",
      data: data,
    });
  },

  async update(req, res) {
    const value = req.body;
    value.whos_update = req.user.id;

    const id = req.params.id;

    await CarService.updateData(id, value);

    const data = await CarService.getDataById(id);

    res.status(202).json({
      status: 202,
      message: "Data Update was Succesfully",
      data: data,
    });
  },

  async destroy(req, res) {
    const id = req.params.id;
    const user_id = req.user.id;

    await CarService.destroyData(id, user_id);

    res.status(202).json({
      status: 202,
      message: "Data Deletion was Succesfully",
    });
  },
};
