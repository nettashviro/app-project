const express = require("express");
const ctrlItem = require("../controllers/item.controller");

const router = express.Router();

router.route("/getItems").get(ctrlItem.getItems);
router.route("/getCategories").get(ctrlItem.getItemCategories);
router.route("/getItems/:field/:value").get(ctrlItem.findItemByField);
router.route("/items/exists/:value").get(ctrlItem.quickSearchInStore);
router.route("/upadteItem").put(ctrlItem.updateItem);
router.route("/addItem").post(ctrlItem.addItem);
router.route("/deleteItem/:id").delete(ctrlItem.deleteItem);

module.exports = router;