import mongoose from "mongoose";
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    match: /^[a-zA-Z ]{2,30}$/,
    required: [true, 'item name is required...!']
  },

  price: {
    type: String,
    required: [true, 'item price is required...!']
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Items', itemSchema);