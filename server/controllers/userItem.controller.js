const mongoose = require("mongoose");
const UserItem = require("../models/userItem.model");
const User = require("../models/user.model");

const items = (req, res, next) => {
  UserItem.find()
    .sort({ date: -1 })
    .select("_id contact_info country credit_card item user date")
    .exec()
    .then((userItems) => {
      if (userItems.length < 1) {
        return res.status(404).json({ message: `no items added...` });
      } else {
        return res.status(200).json({ success: true, userItems: userItems });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const addItem = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(409).json({ message: `invalid user id...` });
      }
      UserItem.find({ contact_info: req.body.contact_info })
        .exec()
        .then((userItem) => {
          if (userItem.length >= 1) {
            return res.status(409).json({ message: `invalid contact info...` });
          }
          UserItem.find({ credit_card: req.body.credit_card })
            .exec()
            .then((userItem) => {
              if (userItem.length >= 1) {
                return res.status(409).json({ message: `invalid credit card info...` });
              }
              let newUserItem = new UserItem({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                price: req.body.price,
                contact_info: req.body.contact_info,
                country: req.body.country,
                credit_card: req.body.credit_card,
                user: req.user._id,
              });
              return newUserItem
                .save()
                .then((userItem) => {
                  return res.status(200).json(userItem);
                })
                .catch((err) => {
                  return res.status(500).json(err);
                });
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const userItems = (req, res, next) => {
  const userId = req.params.id;
  UserItem.find({ user: userId })
    .sort({ date: -1 })
    .select("name price _id user")
    .exec()
    .then((userItems) => {
      if (userItems.length < 1) {
        return res.status(404).json({
          message: `no items added yet...`,
        });
      }
      return res.status(200).json(userItems);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const deleteItem = (req, res, next) => {
  const itemId = req.params.id;
  UserItem.find({ user: itemId })
    .exec()
    .then((userItems) => {
      if (!userItems) {
        return res.status(404).json({
          message: `no items added yet...`,
        });
      }
      UserItem.deleteOne({ _id: itemId })
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

module.exports = {
  items,
  addItem,
  userItems,
  deleteItem
}