const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userItemSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    items: [{
        type: String,
        ref: 'Item'
    }]
});

module.exports = mongoose.model("UserItem", userItemSchema);