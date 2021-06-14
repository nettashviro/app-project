const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: [true, "item name is required...!"],
  },
  price: {
    type: String,
    required: [true, "item price is required...!"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
