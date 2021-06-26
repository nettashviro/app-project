const socketIO = require("socket.io");

setupWebSocket = (server) => {
  // create socket io instance
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.emit("userConnected", io.engine.clientsCount);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = { setupWebSocket };
