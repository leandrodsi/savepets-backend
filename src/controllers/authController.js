const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

const User = require("../models/User");

class authController {
  async register(req, res) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email }))
        return res.status(400).send({ error: "User already exists" });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) return res.status(400).send({ error: "User not found" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ error: "Invalid password" });

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: "Authentication failed" });
    }
  }
}

module.exports = new authController();
