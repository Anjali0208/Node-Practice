const fs = require("fs");

// Sync and overwrite content
// fs.writeFileSync("./test1.txt", "hello to fs module");

// Async
fs.writeFile("./test2.txt", "hello to fs module change", (err) => {});

// Sync and return, blocking
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

// Async and not return and expect a call back function to handle the error and result
// non-blocking operation

fs.readFile("./contact.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(result);
  }
});
