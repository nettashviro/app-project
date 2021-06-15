const User = require("../models/customer.model");
const mongoose = require("mongoose");
require("../utils/database");

User.find({ username: "admin" })
  .exec()
  .then((user) => {
    if (user.length < 1) {
      let newAdmin = new User({
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
    console.log(err);
  });
