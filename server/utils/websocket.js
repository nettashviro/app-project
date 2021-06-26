const socketIO = require("socket.io");

setupWebSocket = (server) => {
  // create socket io instance
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected", io.engine.clientsCount);
    socket.emit("userConnected", "heyy");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = { setupWebSocket };
