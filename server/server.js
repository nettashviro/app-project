require("./utils/database");
require("./seeds/seeds");

const path = require("path");
const cors = require("cors");
const passport = require("passport");
const logger = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const jwtAuthentication = require("./utils/passport");

const userRoute = require("./routes/user.router");
const cartRoute = require("./routes/cart.router");
const itemsRoute = require("./routes/item.router");
const orderRoute = require("./routes/order.router");
const branchRoute = require("./routes/branch.router");
const dashboardRoute = require("./routes/index.router");

const { port } = require("./config");
const { createServer } = require("http");
const { setupWebSocket } = require("./utils/websocket");
const { calculateTree } = require("./services/ahoCorasickImplementation");

/** App initialization **/
const app = express();
const server = createServer(app);
app.use(express.static(path.resolve(__dirname, "../public")));

calculateTree();

/** Middlewares **/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
jwtAuthentication(passport);

app.use(logger("dev")); // Setup Http-Logger Morgan Middleware

// Handling CORS Erros
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

/**  Configure socket io **/
setupWebSocket(server);

/** Routes */
app.get("/health", (req, res) => res.send("alive"));
app.use("/api", dashboardRoute);
app.use("/api", itemsRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/branch", branchRoute);

/** Setup Port & Listening to Server **/
server.listen(port, () => console.log(`server running on port ${port}!!`));
