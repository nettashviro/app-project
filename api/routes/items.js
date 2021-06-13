import express from "express";
import mongoose from "mongoose";

//Import Item Model
import Item from "../models/itemSchema";

const router = express.Router();

//Get All Of The Data From The DataBase
router.route('/items').get((req, res, next) => {
  Item
    .find()
    .select('name price date _id')
    .exec()
    .then(items => {
      if (items.length < 1) {
        return res.status(404).json({
          message: `items not found...`
        });
      } else {
        return res.status(200).json(items);
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


//Seed Items To The DataBase
router.route('/item/seed').post((req, res, next) => {
  let item = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  return item
    .save()
    .then(item => {
      return res.status(200).json({
        success: true,
        item: item
      });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});



export default router;