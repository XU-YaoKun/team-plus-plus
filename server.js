var express = require("express");
var http = require("http");
var app = express();
var httpServer = http.createServer(app);
var io = require("socket.io")(httpServer);

app.use(function (req, res, next) {
  console.log(
    "Received",
    req.method,
    "request for resource",
    req.path,
    "from",
    req.ip
  );
  next(); // callback to the middleware function
});

app.use(express.static(__dirname));

httpServer.listen(3000, function () {
  console.log("Listening on port 3000");
});

var numClients = 0;
io.on("connection", function (client) {
  console.log("Client", numClients++, "connected.");

  client.on("join", function (data) {
    console.log(data);
  });

  client.on("chat", function (msg) {
    console.log(msg);
    client.broadcast.emit("chat msg", msg);
  });
});
