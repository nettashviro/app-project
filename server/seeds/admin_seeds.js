const user = require("../models/user.model");
const mongoose = require("mongoose");
require("../utils/database");

user
  .find({ username: "admin" })
  .exec()
  .then((user) => {
    if (user.length < 1) {
      let newAdmin = new user({
        _id: new mongoose.Types.ObjectId(),
        name: "admin",
        username: "admin",
        email: "admin@gmail.com",
        password: 123456,
        isAdmin: true,
      });
      newAdmin.save((err, doc) => {
        if (err) console.log(err);
      });
    }
  })
  .catch((err) => {
    console.log("there is already admin");
  });
