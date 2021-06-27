const express = require("express");
const jwtHelper = require("../utils/jwtHelper");
const ctrlUserItem = require("../controllers/cart.controller");

const router = express.Router();
router.route("/getAllCarts").get(ctrlUserItem.getAll);
router.route("/getCart/:id").get(ctrlUserItem.userCart);
router.route("/addItem").post(jwtHelper.verifyJwtToken, ctrlUserItem.addItem);
router.route("/deleteCart").delete(jwtHelper.verifyJwtToken, ctrlUserItem.deleteUserItem);
router.route("/deleteItem/:userId/:itemId").delete(ctrlUserItem.deleteItemFromCart);

module.exports = router;
