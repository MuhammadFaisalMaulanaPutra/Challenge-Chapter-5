const CarService = require("../service/CarService");

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

  async list_withDeleted(req, res) {
    const list = await CarService.getAllDataWithDeleted();

    res.status(200).json({
      status: 200,
      message: "List data already to use",
      data: list,
    });
  },

  async store(req, res) {
    const value = req.body;
    value.whosCreate = req.user.username;

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
    value.whosUpdate = req.user.username;

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
    const name = req.user.username;

    await CarService.destroyData(id, name);

    res.status(202).json({
      status: 202,
      message: "Data Deletion was Succesfully",
    });
  },
};
