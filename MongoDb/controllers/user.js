const User = require("../models/userSchema");

const getAllUsers = async (req, res) => {
  const allDbUsers = await User.find();
  return res.status(200).json(allDbUsers);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
};

const createNewUser = async (req, res) => {
  const body = req.body;
  const { firstName, lastName, email, gender } = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ message: "Fill the whole fields" });
  }
  const result = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
  });
  console.log("User created", result);
  return res.status(201).json({ message: "User Created" });
};

const patchUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "success" });
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  patchUser,
  deleteUser,
};
