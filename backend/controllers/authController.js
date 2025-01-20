const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if ((!name, !email, !password))
      return res
        .status(404)
        .send({ error: "Please enter your required details!" });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if ((!email, !password))
      return res
        .status(404)
        .send({ error: "Please enter your required details!" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue)
      return res
        .status(401)
        .send({ error: "Oops your password is incorrect!" });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ name: user.name, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { register, login };
