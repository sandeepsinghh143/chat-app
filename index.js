const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
//socket contains client info
io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("message",(message)=>{
    io.emit("message",message,socket.id);
  })
});

server.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
