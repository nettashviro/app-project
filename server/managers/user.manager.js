const User = require("../models/user.model");
const mongoose = require("mongoose");

const getUsersCount = async () => {
  const docCount = await User.countDocuments();
  return docCount;
};

const getUserById = async (id) => {
  const user = await User.findById({ _id: mongoose.Types.ObjectId(id) });
  return !user ? null : user.username;
};

module.exports = {
  getUsersCount,
  getUserById,
};
