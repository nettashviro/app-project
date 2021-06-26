const User = require("../models/user.model");

const getUsersCount = async () => {
  const docCount = await User.countDocuments();
  return docCount;
};

module.exports = {
  getUsersCount,
};
