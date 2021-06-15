const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "customer is required...!"],
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    totalPrice: {
        type: String,
        required: [true, "total price is required...!"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Orders", orderSchema);
