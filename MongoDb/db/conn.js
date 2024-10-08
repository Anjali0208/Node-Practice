const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/node-practice")
//   .then(() => {
//     console.log("Mongo server connected");
//   })
//   .catch((err) => {
//     console.log("Mongo error: ", err);
//   });

async function connectMongoDb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
