const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { writeFile } = require("fs");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("listenMsg", data);
  });

  socket.on("image", (file) => {
    socket.broadcast.emit("listenMsg", file);
  });
});
server.listen(3001, () => {
  console.log("server is listening at port 3001");
});
