const mongoose = require("mongoose");
const User = require("../models/user.model");

const getUsersCount = () => {
  return User.count();
};

module.exports = {
  getUsersCount,
};
