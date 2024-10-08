const express = require("express");

const router = express.Router();
const User = require("../models/userSchema");
const {
  getAllUsers,
  getUserById,
  createNewUser,
  patchUser,
  deleteUser,
} = require("../controllers/user");

router.post("/", createNewUser);

router.get("/", getAllUsers);

// or
// router.route('/).get(getAllUsers).post(createNewUser)

router.get("/:id", getUserById);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

module.exports = router;
