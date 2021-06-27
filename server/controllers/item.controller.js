const Item = require("../models/item.model");
const mongoose = require("mongoose");
const { all } = require("../routes/item.router");
const { search } = require("../services/ahoCorasickImplementation")
const path = require('path')

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
        colors: req.body.colors,
        price: req.body.price,
    });
    return item
        .save()
        .then((item) => {
            res.status(200).json({ success: true, item: item });
            next()
        })
        .catch((err) => {
            console.log("err", err)
            return res.status(500).json(err);
        });
};


const deleteItem = (req, res, next) => {
    const itemId = req.params.id;
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
        let previousItem = await Item.find({_id: item._id}).exec()

        res.locals.itemPreviousName = previousItem[0].name;
        res.locals.itemNewName = item.name;

        res.locals.itemPreviousColors = previousItem[0].colors;
        res.locals.itemNewColors = item.colors;
        await Item.updateOne({ _id: item._id }, item, {})
        next()
        return res.status(200).json({})
    } catch (err) {
        console.log("err", err)
        return res.status(500).json(err);
    }
}

const updateImage = async (req, res, next) => {
    try {
        const imageName = Object.keys(req.files)[0];
        const myVideo = req.files[imageName];
        let filename = `${__dirname}\\..\\..\\client\\src\\assets\\images\\${myVideo.name}`
        myVideo
            .mv(filename, async (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("success")
                }
            });
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
const quickSearchInStore = (req, res, next) => {
    const found = search(req.params.value)
    if (found) {
        res.status(200).send({ message: 'found' })
    } else {
        res.status(400).send({ message: 'not found' })
    }
}

module.exports = {
    getItems,
    addItem,
    updateItem,
    updateImage,
    deleteItem,
    findItemByField,
    getItemColors,
    quickSearchInStore,
    getItemCategories
}