const { car } = require("../models");

module.exports = {
  async list(req, res) {
    const list = await car.findAll();

    res.status(200).json({
      status: 200,
      message: "List data already to use",
      data: list,
    });
  },

  //   async findId(req,res){

  //   },

  async store(req, res) {
    const { plate, model, manufacture, capacity, year, transmission } =
      req.body;

    await car.create({
      plate,
      model,
      manufacture,
      capacity,
      year,
      transmission,
    });

    const data = await car.findOne({
      order: [["id", "DESC"]],
    });

    res.status(201).json({
      status: 201,
      message: "Data Creation was Succesfully",
      data: data,
    });
  },

  async update(req, res) {
    const { plate, model, manufacture, capacity, year, transmission } =
      req.body;

    const id = req.params.id;

    await car.update(
      {
        plate,
        model,
        manufacture,
        capacity,
        year,
        transmission,
      },
      {
        where: {
          id,
        },
      }
    );

    const data = await car.findByPk(id);

    res.status(202).json({
      status: 202,
      message: "Data Update was Succesfully",
      data: data,
    });
  },

  async destroy(req, res) {
    const id = req.params.id;

    car.destroy({
      where: {
        id,
      },
    });

    res.status(202).json({
      status: 202,
      message: "Data Deletion was Succesfully",
    });
  },
};
