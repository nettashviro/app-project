const express = require("express");
const ctrlItem = require("../controllers/item.controller");

const router = express.Router();

router.route("/getItems").get(ctrlItem.getItems);
router.route("/getItems/:field/:value").get(ctrlItem.findItemByField);
router.route("/addItem").post(ctrlItem.addItem);
router.route("/deleteItem").delete(ctrlItem.deleteItem);

module.exports = router;