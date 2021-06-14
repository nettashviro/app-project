const Item = require("../models/item.model");
const mongoose = require("mongoose");

module.exports.items = (req, res, next) => {
  Item.find()
    .exec()
    .then((items) => {
      if (items.length < 1) {
        return res.status(404).json({ message: `items not found...` });
      } else {
        return res.status(200).json(items);
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.addItem = (req, res, next) => {
  let item = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  return item
    .save()
    .then((item) => {
      return res.status(200).json({ success: true, item: item });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
