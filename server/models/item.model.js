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
  colors: [{
    type: String
  }],
  category: {
    type: String,
    required: [true, "item category is required...!"],
  },
  image: {
    type: String,
    required: [true, "item image is required...!"],
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

module.exports = mongoose.model("Item2", itemSchema);
