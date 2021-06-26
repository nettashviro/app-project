const Order = require("../models/order.model");

const getOrdersCount = async () => {
  const docCount = await Order.countDocuments();
  return docCount;
};

module.exports = {
  getOrdersCount,
};
