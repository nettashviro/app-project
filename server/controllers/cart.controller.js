const mongoose = require("mongoose");
const UserItem = require("../models/userItem.model");
const Item = require("../models/item.model");
const User = require("../models/user.model");

const getAll = async (req, res, next) => {
  let userItems = await UserItem.find();
  if (userItems.length < 1) {
    return res.status(404).json({ message: `no items added...` });
  } else {
    const newUserItems = [];
    for (let userItem of userItems) {
      let newUserItem = { _id: userItem._id, items: [] };
      const itemIds = userItem.items;
      const items = [];
      for (let itemId of itemIds) {
        const item = await Item.findOne({ _id: mongoose.Types.ObjectId(itemId) });
        newUserItem.items.push(item);
      }
      newUserItems.push(newUserItem);
    }
    return res.status(200).json(newUserItems);
  }
};

const addItem = (req, res, next) => {
  const item = req.body._id;
  UserItem.findOne({ _id: mongoose.Types.ObjectId(req.user._id) })
    .exec()
    .then(async (userItems) => {
      if (!userItems) {
        userItems = new UserItem({
          _id: mongoose.Types.ObjectId(req.user._id),
          items: [],
        });
      }
      userItems.items.push(item);
      UserItem.updateOne({ _id: userItems._id }, userItems, { upsert: true })
        .exec()
        .then((updatedUserItems) => {
          return res.status(200).json(updatedUserItems);
        })
        .catch((err) => {
          console.log("err", err);
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(500).json(err);
    });
};

const userCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let userItems = await UserItem.findOne({ _id: mongoose.Types.ObjectId(userId) });
    let newUserItems = { _id: userItems._id, items: [], date: userItems.date };
    let newItems = [];
    if (userItems.length < 1) {
      return res.status(404).json({
        message: `no items added yet...`,
      });
    }
    const itemIds = userItems.items;
    for (let itemId of itemIds) {
      if (itemId) {
        const item = await Item.findOne({ _id: mongoose.Types.ObjectId(itemId) });
        newItems.push(item);
      }
    }
    newUserItems.items = newItems;
    return res.status(200).json(newUserItems);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

const deleteUserItem = (req, res, next) => {
  const userId = req.user._id;
  UserItem.find({ _id: userId })
    .exec()
    .then((userItems) => {
      if (!userItems) {
        return res.status(404).json({
          message: `no items added yet...`,
        });
      }
      UserItem.updateOne({ _id: userId }, { $set: { items: [] } })
        .exec()
        .then((item) => {
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

const deleteItemFromCart = async (req, res, next) => {
  try {
    const { itemId, userId } = req.params;
    console.log("itemid", itemId, "userId", userId);
    let userItem = await UserItem.findOne({ _id: userId });
    console.log("userItem", userItem);

    if (!userItem) {
      return res.status(404).json({
        message: `no items added yet...`,
      });
    }
    let foundFirst = false;
    let filteredItems = userItem.items.filter((item) => {
      if (item !== itemId && !foundFirst) {
        foundFirst = true;
        return item;
      }
    });
    await UserItem.updateOne({ _id: userId }, { $set: { items: filteredItems } });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  addItem,
  userCart,
  deleteUserItem,
  deleteItemFromCart,
};
