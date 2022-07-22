const express = require("express");
const app = express();
const path = require("path");
const { sequelize } = require("./models");
const { rootRouter } = require("./Router");
const cors = require("cors");
var http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 6969;

const publicPath = path.join(__dirname, "./Public");
app.use("/Public", express.static(publicPath));

app.use("/api/v1", rootRouter);

// app.listen(PORT, async () => {
//   console.log(`server run on http://localhost:${PORT}`);
//   try {
//     await sequelize.authenticate();
//     console.log("Connect database success!");
//   } catch (error) {
//     console.log("Connect database error!", error);
//   }
// })

http.listen(PORT, async () => {
  console.log(`server run on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connect database success!");
  } catch (error) {
    console.log("Connect database error!", error);
  }
});

//Socket io

let onlineUsers = [];
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    console.log("helo");
    addNewUser(username, socket.id);
    console.log(onlineUsers);
  });

  socket.on("ResetNotification", (userId) => {
    console.log(`Notification: ${userId}`)
    io.to(getUser(userId)?.socketId).emit("DoResetNotification");
  })

  socket.on("ResetMessage", (userId, userSendId) => {
    io.to(getUser(userId)?.socketId).emit("DoResetMessage", userSendId);
  })

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("---------------disconnect----------------");
  });
});

//----------------------
