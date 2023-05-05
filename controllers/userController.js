const UserService = require("../service/userService");
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

    const token = jwt.sign(
      {
        id: User.id,
        username: User.username,
        email: User.email,
        role: User.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: User.id,
        email: User.email,
      },
      process.env.REFRESH_TOKEN_SECRET
    );

    await UserService.updateRefreshToken(User.id, refreshToken);

    const attributes = [
      "id",
      "username",
      "email",
      "role",
      "refresh_token",
      "createdAt",
      "updatedAt",
    ];

    const data = await UserService.getDataByIdWithAttr(User.id, attributes);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      status: 200,
      message: "User SignIn was Succesfully",
      data: data,
      token: token,
    });
  },

  async refreshUserToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        status: 401,
        message: "User Unauthorized",
      });
    }

    const User = await UserService.getDataByRefreshToken(refreshToken);

    if (!User) {
      return res.status(403).json({
        status: 403,
        message: "User Forbidden",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: 401,
        message: "Token is Invalid",
      });
    }

    const token = jwt.sign(
      {
        id: User.id,
        username: User.username,
        email: User.email,
        role: User.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    res.status(200).json({
      status: 200,
      message: "Generating Refresh Token was Successfully",
      token: token,
    });
  },

  async signOut(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(204);

    const User = await UserService.getDataByRefreshToken(refreshToken);

    if (!User) return res.status(204);

    await UserService.updateRefreshToken(User.id, null);
    res.clearCookie("refreshToken");

    res.status(200).json({
      status: 200,
      message: "User SignOut was Successfully",
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
