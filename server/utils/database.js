const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

mongoose.connect(MONGO_URI, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

// Check for errors
connection.on("error", (err) => {
  if (err) console.log(err);
});

// Check for connection
connection.once("open", () => console.log(`MongoDB connection succeeded!!`));

module.exports = connection;
