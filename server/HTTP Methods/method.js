const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `Date : ${Date.now()} ${req.method} ${
    req.url
  } New Req Received \n`;
  const MyUrl = url.parse(req.url, true);
  console.log(MyUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (MyUrl.pathname) {
      case "/":
        if (req.method === "GET") {
          return res.end("Hello from homePage");
        }
        break;
      case "/about":
        const username = MyUrl.query.username;
        res.end(`I am ${username}`);
        break;
      case "/search":
        const search = MyUrl.query.search_query;
        res.end(`You are searching for ${search}`);
        break;
      case "/signup":
        if (req.method === "GET") {
          return res.end("sign up form");
        } else if (req.method === "POST") {
          // DB query
          res.end("Form Submitted");
        }
      default:
        res.end("404 Not found");
        break;
    }
  });
});

myServer.listen(8080, () => {
  console.log("Server Started");
});
