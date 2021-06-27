const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let branchSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("branch", branchSchema);
