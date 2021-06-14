const Item = require("../models/item.model");
const mongoose = require("mongoose");
require("../utils/database");

Item.find({ name: "tshirt1" })
  .exec()
  .then((item) => {
    if (item.length < 1) {
      let newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: "tshirt1",
        price: 35,
      });
      newItem.save((err, doc) => {
        if (err) console.log(err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("there is already product seeds");
  });
