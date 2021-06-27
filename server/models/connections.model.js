const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let connectionsSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("connections", connectionsSchema);
