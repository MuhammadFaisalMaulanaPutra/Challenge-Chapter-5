const carService = require("../service/carService");

module.exports = {
  async list(req, res) {
    const list = await carService.getAllData();

    res.status(200).json({
      status: 200,
      message: "List data already to use",
      data: list,
    });
  },

  async store(req, res) {
    const value = req.body;

    await carService.storeData(value);

    const data = await carService.getLatestData();

    res.status(201).json({
      status: 201,
      message: "Data Creation was Succesfully",
      data: data,
    });
  },

  async update(req, res) {
    const value = req.body;

    const id = req.params.id;

    await carService.updateData(id, value);

    const data = await carService.getDataById(id);

    res.status(202).json({
      status: 202,
      message: "Data Update was Succesfully",
      data: data,
    });
  },

  async destroy(req, res) {
    const id = req.params.id;

    await carService.destroyData(id);

    res.status(202).json({
      status: 202,
      message: "Data Deletion was Succesfully",
    });
  },
};
