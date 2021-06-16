const express = require("express");
const jwtHelper = require("../utils/jwtHelper");
const ctrlUserItem = require("../controllers/userItem.controller");

const router = express.Router();

router.route("/getAll").get(ctrlUserItem.getAll);
router.route("/item/:id").get(ctrlUserItem.userItems);
router.route("/item/add").post(jwtHelper.verifyJwtToken, ctrlUserItem.addItem);
router.route("/deleteUserCart/:userId").delete(ctrlUserItem.deleteUserItem);
router.route("/deleteItem/:userId/:itemId").delete(ctrlUserItem.deleteItemFromCart);

module.exports = router;