const Item = require("../models/item.model");
const mongoose = require("mongoose");
const { all } = require("../routes/item.router");

const getItems = async (req, res, next) => {
    try {
        let items = await Item.find()
        if (items.length < 1) {
            return res.status(404).json({ message: `items not found...` });
        } else {
            return res.status(200).json(items);
        }
    } catch (err) {
        return res.status(500).json(err);
    }

};

const addItem = (req, res, next) => {
    let item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
    });
    return item
        .save()
        .then((item) => {
            return res.status(200).json({ success: true, item: item });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};


const deleteItem = (req, res, next) => {
    const itemId = req.params.id;
    console.log("itemId", itemId)
    Item.find({ _id: itemId })
        .exec()
        .then((items) => {
            if (!items) {
                return res.status(404).json({
                    message: `no items matched to id...`,
                });
            }
            Item.deleteOne({ _id: itemId })
                .exec()
                .then((item) => {
                    return res.status(200).json({ success: true });
                })
                .catch((err) => {
                    console.log("err", err)
                    return res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log("err", err)
            return res.status(500).json(err);
        });
};

const findItemByField = (req, res, next) => {
    const { field, value } = req.params;
    Item.find({
        [field]: value
    })
        .exec()
        .then((items) => {
            if (items.length < 1) {
                return res.status(404).json({ message: `items not found...` });
            } else {
                return res.status(200).json(items);
            }
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const updateItem = async (req, res, next) => {
    try {
        const item = req.body
        await Item.updateOne({ _id: item._id }, item, {})
        return res.status(200).json({})
    } catch (err) {
        console.log("err", err)
        return res.status(500).json(err);
    }
}

const getItemCategories = async (req, res, next) => {
    try {
        const categories = await Item.find().distinct('category')
        return res.status(200).json(categories)
    } catch (err) {
        console.log("err", err)
        return res.status(500).json(err);
    }
}

const getItemColors = async (req, res, next) => {
    const colors = []
    try {
        const allItems = await Item.find();
        allItems.forEach(item => {
            item.colors.forEach(color => {
                if (!colors.includes(color))
                    colors.push(color)
            })
        })
        return res.status(200).json(colors)
    } catch (err) {
        console.log("err", err)
        return res.status(500).json(err);
    }
}
module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    findItemByField,
    getItemCategories,
    getItemColors
}