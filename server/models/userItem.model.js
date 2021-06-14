const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userItemSchema = new Schema({
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
  country: {
    type: String,
    required: [true, "country is required..."],
  },
  contact_info: {
    type: String,
    unique: true,
    required: [true, "contact info is required..."],
  },
  credit_card: {
    type: String,
    unique: true,
    required: [true, "credit card number is required..."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("UserItem", userItemSchema);
