const express = require("express");
const ctrlItem = require("../controllers/item.controller");

const router = express.Router();

router.route("/getItems").get(ctrlItem.getItems);
router.route("/deleteItem").delete(ctrlItem.deleteItem);
router.route("/addItem").post(ctrlItem.addItem);

module.exports = router;
