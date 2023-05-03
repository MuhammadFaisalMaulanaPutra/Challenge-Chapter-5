const UserService = require("../service/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async signUp(req, res) {
    const value = req.body;
    value.role = "member";

    const rgsEmail = await UserService.getDataByEmail(value.email);

    if (rgsEmail) {
      res.status(400).json({
        message: "Email already in use",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(req.body.password, salt);

    await UserService.storeData(value);

    const attributes = [
      "id",
      "username",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ];
    const data = await UserService.getDataLatest(attributes);

    res.status(201).json({
      status: 201,
      message: "Data Creation was Successfully",
      data: data,
    });
  },

  async signIn(req, res) {
    const User = await UserService.getDataByEmail(req.body.email);

    if (!User) {
      res.status(404).json({
        status: 404,
        message: "User does not exist",
      });
      return;
    }

    const password_valid = await bcrypt.compare(
      req.body.password,
      User.password
    );

    if (!password_valid) {
      res.status(400).json({
        status: 400,
        message: "User Password Incorrect",
      });
      return;
    }

    token = jwt.sign(
      {
        id: User.id,
        username: User.username,
        email: User.email,
        role: User.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const attributes = [
      "id",
      "username",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ];

    const data = await UserService.getDataByIdWithAttr(User.id, attributes);

    res.status(200).json({
      status: 200,
      message: "User SignIn was Succesfully",
      data: data,
      token: token,
    });
  },

  async addAdmin(req, res) {
    const value = req.body;
    value.role = "admin";

    const rgsEmail = await UserService.getDataByEmail(value.email);

    if (rgsEmail) {
      res.status(400).json({
        message: "Email already in use",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(req.body.password, salt);

    await UserService.storeData(value);

    const attributes = [
      "id",
      "username",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ];
    const data = await UserService.getDataLatest(attributes);

    res.status(201).json({
      status: 201,
      message: "Data Creation was Successfully",
      data: data,
    });
  },

  async currentUser(req, res) {
    const User = req.user;

    const attributes = [
      "id",
      "username",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ];

    const data = await UserService.getDataByIdWithAttr(User.id, attributes);
    res.status(200).json({
      status: 200,
      message: "Getting data was Successfully",
      data: data,
    });
  },
};
