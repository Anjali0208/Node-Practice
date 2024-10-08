const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./db/conn");
const { logReqRes } = require("./middlewares/index");
const PORT = 8080;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.text"));

// mongo connect
connectMongoDb("mongodb://localhost:27017/node-practice")
  .then(() => {
    console.log("MongoDb connected!");
  })
  .catch((err) => {
    console.log("Error", err);
  });

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
