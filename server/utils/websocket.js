const socketIO = require("socket.io");

setupWebSocket = (server) => {
  // create socket io instance
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected");
    io.emit("connected", io.engine.clientsCount);

    socket.on("onlineUserCount", () => {
      io.emit("connected", io.engine.clientsCount);
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
      io.emit("connected", io.engine.clientsCount);
    });
  });
};

module.exports = { setupWebSocket };
