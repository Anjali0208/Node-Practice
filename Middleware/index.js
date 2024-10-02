const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("hello from middleware 1");
  // return res.send({ msg: "hello" });
  next();
});

app.use((req, res, next) => {
  console.log("hello from middleware 2");
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} ${req.method} ${req.ip} ${req.path} ${req.url}`,
    (err, date) => {
      next();
    }
  );
  // next();
});

// if rendering html page
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul
    `;

  res.send(html);
});

// if rendering on mobile, or different platform

app.get("/api/users", (req, res) => {
  return res.send(users);
});

// user with ID
app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    return res.send(user);
  })
  .patch((req, res) => {
    // patch a user id 1
    // const body = req.body;
    const id = Number(req.params.id);
    const { first_name } = req.body;
    const user = users.find((u) => u.id === id);
    if (user) {
      user.first_name = first_name;
      fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.send(user);
      });
    } else {
      return res.send({ status: "error" });
    }
  })
  .delete((req, res) => {
    // delete a user id 1
    const id = Number(req.params.id);
    const user = users.filter((u) => u.id !== id);
    fs.writeFile("MOCK_DATA.json", JSON.stringify(user), (err, data) => {
      return res.send(user);
    });
  });

app.post("/api/user", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.send({ status: "success", id: users.length });
  });
});

app.listen(8080, () => {
  console.log("Server is running");
});
