const mongoose = require("mongoose");
const UserItem = require("../models/userItem.model");
const Item = require("../models/item.model");
const User = require("../models/user.model");

const getAll = async(req, res, next) => {
    let userItems = await UserItem.find()
    if (userItems.length < 1) {
        return res.status(404).json({ message: `no items added...` });
    } else {
        const newUserItems = []
        for (let userItem of userItems) {
            let newUserItem = { _id: userItem._id, items: [] }
            const itemIds = userItem.items
            const items = []
            for (let itemId of itemIds) {
                const item = await Item.findOne({ _id: mongoose.Types.ObjectId(itemId) })
                newUserItem.items.push(item)
            }
            newUserItems.push(newUserItem)
        }
        return res.status(200).json(newUserItems);
    }
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

const userCart = (req, res, next) => {
    const userId = req.params.id;
    UserItem.find({ _id: mongoose.Types.ObjectId(userId) })
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

const deleteUserItem = (req, res, next) => {
    const userId = req.params.userId;
    UserItem.find({ _id: userId })
        .exec()
        .then((userItems) => {
            if (!userItems) {
                return res.status(404).json({
                    message: `no items added yet...`,
                });
            }
            UserItem.deleteOne({ _id: userId })
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
const deleteItemFromCart = async(req, res, next) => {
    const { userId, itemId } = req.params;
    let userItem = await UserItem.findOne({ _id: userId })
    if (!userItem) {
        return res.status(404).json({
            message: `no items added yet...`,
        });
    }
    let filteredItems = userItem.items.filter(item => {
        console.log("item !== itemId", item !== itemId)
        if (item !== itemId)
            return item
    })
    await UserItem.updateOne({ _id: userId }, { $set: { items: filteredItems } })
        // newUserItems.save()
    return res.status(200).json(newUserItems);
};

module.exports = {
    getAll,
    addItem,
    userCart,
    deleteUserItem,
    deleteItemFromCart
}