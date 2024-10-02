const express = require("express");
const User = require("./model/userSchema");
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: false }));

// mongo connect
require("./db/conn");

app.post("/api/user", async (req, res) => {
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
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find();
  const html = `
    <ul>
    ${allDbUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find();
  return res.status(200).json(allDbUsers);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "success" });
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
