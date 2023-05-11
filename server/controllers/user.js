const { User, Favorites } = require("../models");
const { generateToken } = require("../config/token");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    const validate = await user.validatePassword(password);
    if (!validate) return res.status(401);
    const payload = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      password: user.password,
      email: user.email,
      admin: user.admin,
    };
    const token = generateToken(payload);

    res.send({ token, payload });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  const { name, lastName, email, password, phone } = req.body;
  try {
    const newUser = await User.create({
      name,
      lastName,
      email,
      password,
      phone,
    });
    Favorites.create({ UserId: newUser.id });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, phone } = req.body.data;
  try {
    const user = await User.findByPk(id);
    const userUpdate = await user.update({ name, lastName, phone });
    const payload = {
      id: userUpdate.id,
      name: userUpdate.name,
      lastName: userUpdate.lastName,
      phone: userUpdate.phone,
      password: userUpdate.password,
      email: userUpdate.email,
      admin: userUpdate.admin,
    };
    token = generateToken(payload);
    res.status(202).send({ payload, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
// ADMIN
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(202).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const infoUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.status(202).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body.data;
  try {
    const user = await User.findByPk(id);
    user.update({ admin });
    res.status(202).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id: id } });
    res.status(202).send("ready");
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  login,
  register,
  editProfile,
  getAllUsers,
  infoUser,
  editUser,
  deleteUser,
};

