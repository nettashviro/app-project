require("./utils/database");
require("./seeds/seeds");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const itemsRoute = require("./routes/item.router");
const userRoute = require("./routes/user.router");
const dashboardRoute = require("./routes/index.router");
const userItemRoute = require("./routes/userItem.router");
const orderRoute = require("./routes/order.router");
const jwtAuthentication = require("./utils/passport");
const { createServer } = require("http");
const { port } = require("./config");

/** App initialization **/
const app = express();
const server = createServer(app);
app.use(express.static(path.resolve(__dirname, "../public")));

/** Middlewares **/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

/** Routes */
app.get("/health", (req, res) => res.send("alive"));
app.use("/api", itemsRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api", dashboardRoute);
app.use("/api/userItems", userItemRoute);

/** Setup Port & Listening to Server **/
server.listen(port, () => console.log(`server running on port ${port}!!`));