const User = require("../models/User");
const bcryptjs = require("bcryptjs");

class UserController {
  async index(req, res) {
    const users = await User.find();

    res.json(users);
  }

  async show(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    res.json(user);
  }

  async create(req, res) {
    const { nome, email, senha, celular } = req.body;

    const user = await User.create({
      nome,
      email,
      senha,
      celular,
    });

    user.senha = undefined;

    res.json(user);
  }
}

module.exports = new UserController();
