const express = require("express");
const ctrlItem = require("../controllers/item.controller");

const router = express.Router();

router.route("/items").get(ctrlItem.Items); //Get All Of The Data From The DataBase
router.route("/item/seed").post(ctrlItem.ItemUpload);

module.exports = router;
