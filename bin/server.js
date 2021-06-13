import express from "express";
import { createServer } from "http";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";

const app = express();
const server = createServer(app);

//Setup Http-Logger Morgan Middleware
app.use(logger('dev'));

//Setup CORS Middleware for Handling CORS Errors
app.use(cors());

//Import Employee Routes
import itemsRoute from "../api/routes/items";
import userRoute from "../api/routes/user";
import dashboardRoute from "../api/routes/dashboard";
import userItemRoute from "../api/routes/userItem";

//Import MongoDB Connection
import "../api/config/database";

//Setup Static Folder Path
app.use(express.static(path.resolve(__dirname, '../public')));

//Setup Body-Parser & Cookie-Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Import Passport File
import jwtAuthentication from "../api/config/passport";
//Setup Passport Configs
jwtAuthentication(passport);

//Handling CORS Erros
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Access, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

//Route for Items
app.use('/api', itemsRoute);

//Route for User
app.use('/user', userRoute);

//Route for DashBoard
app.use('/user', dashboardRoute);

//Route for User Item
app.use('/user', userItemRoute);

//Setup Port & Listening to Server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server running on port ${port}!!`));