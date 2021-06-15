const Order = require("../models/order.model");
const mongoose = require("mongoose");

getOrders = (req, res, next) => {
  Order.find()
    .exec()
    .then((orders) => {
      if (orders.length < 1) {
        return res.status(404).json({ message: `orders not found...` });
      } else {
        return res.status(200).json(orders);
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports = {
  getOrders
}

