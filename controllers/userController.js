const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  async signUp(req, res) {
    const { username, email } = req.body;
    const role = "member";

    const rgsEmail = await user.findAll({
      where: {
        email: email,
      },
    });

    if (rgsEmail[0]) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    await user.create({
      username,
      email,
      password,
      role,
    });

    const data = await user.findOne({
      order: [["id", "DESC"]],
    });

    res.status(201).json({
      status: 201,
      message: "Data Creation was Successfully",
      data: data,
    });
  },

  //   async signIn(req, res) {
  //     const user = await user.findOne({ where: { email: req.body.email } });
  //     if (user) {
  //       const password_valid = await bcrypt.compare(
  //         req.body.password,
  //         user.password
  //       );
  //       if (password_valid) {
  //         token = jwt.sign(
  //           { id: user.id, email: user.email, role: user.role },
  //           process.env.ACCESS_TOKEN_SECRET
  //         );
  //         res.status(200).json({ token: token });
  //       } else {
  //         res.status(400).json({ error: "Password Incorrect" });
  //       }
  //     } else {
  //       res.status(404).json({ error: "User does not exist" });
  //     }
  //   },
};
