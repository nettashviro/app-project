const socketIO = require("socket.io");
const mngUser = require("../managers/user.manager");
const mngOrder = require("../managers/order.manager");

setupWebSocket = (server) => {
  // create socket io instance
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });
  let cashierCount = 0;

  io.on("connection", (socket) => {
    console.log("user connected");
    io.emit("connected", io.engine.clientsCount);

    socket.on("onlineUserCount", () => {
      io.emit("connected", io.engine.clientsCount);
    });

    socket.on("register", async () => {
      console.log("new user register");

      let users = await mngUser.getUsersCount();
      io.emit("register", users);
    });

    socket.on("newOrder", async () => {
      console.log("new user order");

      let orders = await mngOrder.getOrdersCount();
      io.emit("ordersCount", orders);
    });

    socket.on("setCashierCount", async (data) => {
      console.log("new setCashierCount");
      cashierCount = data;
      socket.broadcast.emit("cashierCount", data);
    });

    socket.on("getCashierCount", async (data) => {
      io.emit("cashierCount", cashierCount);
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
      io.emit("connected", io.engine.clientsCount);
    });
  });
};

module.exports = { setupWebSocket };
