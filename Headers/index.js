const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();

const PORT = 8080;
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  // custom headers
  //   res.setHeader("myName", "Anjali");
  //   whenever make custom header always starts with X
  res.setHeader("X-MyName", "Anjali");
  return res.send(users);
});

app.listen(PORT, () => {
  console.log("Server is running");
});
