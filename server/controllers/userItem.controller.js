const mongoose = require("mongoose");
const UserItem = require("../models/userItem.model");
const User = require("../models/user.model");

const items = (req, res, next) => {
    UserItem.find()
        .sort({ date: -1 })
        .select("_id contact_info country credit_card item user date")
        .exec()
        .then((userItems) => {
            if (userItems.length < 1) {
                return res.status(404).json({ message: `no items added...` });
            } else {
                return res.status(200).json({ success: true, userItems: userItems });
            }
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const addItem = (req, res, next) => {
    UserItem.findOne({ _id: mongoose.Types.ObjectId(req.user._id) }).exec().then(async(userItems) => {
        if (!userItems) {
            userItems = new UserItem({
                _id: mongoose.Types.ObjectId(req.user._id),
                items: []
            })
        }

        userItems.items.push(req.body._id)
        UserItem.updateOne({ _id: userItems._id }, userItems, { upsert: true }).exec().then(updatedUserItems => {
            return res.status(200).json(updatedUserItems);
        }).catch(err => {
            console.log("err", err)
            return res.status(500).json(err);
        })
    }).catch(err => {
        console.log("err", err)
        return res.status(500).json(err);
    })
};

const userItems = (req, res, next) => {
    const userId = req.params.id;
    UserItem.find({ user: userId })
        .sort({ date: -1 })
        .select("name price _id user")
        .exec()
        .then((userItems) => {
            if (userItems.length < 1) {
                return res.status(404).json({
                    message: `no items added yet...`,
                });
            }
            return res.status(200).json(userItems);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const deleteItem = (req, res, next) => {
    const itemId = req.params.id;
    UserItem.find({ user: itemId })
        .exec()
        .then((userItems) => {
            if (!userItems) {
                return res.status(404).json({
                    message: `no items added yet...`,
                });
            }
            UserItem.deleteOne({ _id: itemId })
                .exec()
                .then((item) => {
                    return res.status(200).json({ success: true });
                })
                .catch((err) => {
                    return res.status(500).json(err);
                });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

module.exports = {
    items,
    addItem,
    userItems,
    deleteItem
}