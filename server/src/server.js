const http = require("http");
const app = require("./app");

const port = 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Running server on port ${port}`);
  console.log("Hi there. Aadil's server");
});
