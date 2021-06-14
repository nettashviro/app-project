const express = require("express");
const ctrlItem = require("../controllers/item.controller");

const router = express.Router();

router.route("/items").get(ctrlItem.items);
router.route("/item").post(ctrlItem.addItem);

module.exports = router;
