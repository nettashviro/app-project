const express = require("express");
const jwtHelper = require("../utils/jwtHelper");
const ctrlUserItem = require("../controllers/userItem.controller");

const router = express.Router();

router.route("/items").get(ctrlUserItem.items);
router.route("/item/:id").get(ctrlUserItem.userItems);
router.route("/item/add").post(jwtHelper.verifyJwtToken, ctrlUserItem.addItem);
router.route("/item/:id").delete(ctrlUserItem.deleteItem);

module.exports = router;
