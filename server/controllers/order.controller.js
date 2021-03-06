const Order = require("../models/order.model");
const mngUser = require("../managers/user.manager");

const mongoose = require("mongoose");

const getOrders = (req, res, next) => {
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

const getUserOrders = (req, res, next) => {
  Order.find({ customer: req.params.userId })
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

const addNewOrder = (req, res, next) => {
  let order = new Order({
    _id: new mongoose.Types.ObjectId(),
    totalPrice: req.body.totalPrice,
    items: req.body.items,
    customer: req.body.customer,
  });
  return order
    .save()
    .then((order) => {
      return res.status(200).json({ success: true, order });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const deleteOrder = (req, res, next) => {
  const orderId = req.params.id;
  Order.find({ _id: orderId })
    .exec()
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          message: `no orders matched to id...`,
        });
      }
      Order.deleteOne({ _id: orderId })
        .exec()
        .then((order) => {
          return res.status(200).json({ success: true });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const updateOrder = async (req, res, next) => {
  try {
    const newOrder = req.body;
    await Item.updateOne({ _id: newOrder._id }, newOrder, {});
    return res.status(200).send("OK");
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

const getStoreIncomes = async (req, res, next) => {
  try {
    const mapreduce = {};
    mapreduce.map = function () {
      emit(this.customer, this.totalPrice);
    };
    mapreduce.reduce = function (customer, prices) {
      return Array.sum(prices);
    };

    let result = await Order.mapReduce(mapreduce);

    let result_populate = await Promise.all(
      result.results.map(async (res) => {
        username = await mngUser.getUserById(res._id);
        return { name: username, count: res.value };
      })
    );

    return res.status(200).json(result_populate);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getOrders,
  addNewOrder,
  deleteOrder,
  updateOrder,
  getStoreIncomes,
  getUserOrders,
};
