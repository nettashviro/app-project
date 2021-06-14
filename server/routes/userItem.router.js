const express = require("express");
const passport = require("passport");
const ctrlUserItem = require("../controllers/userItem.controller");

const router = express.Router();

router.route("/items").get(ctrlUserItem.items);
router.route("/item/:id").get(ctrlUserItem.userItems);
router.route("/item/add").post(passport.authenticate("jwt", { session: false }), ctrlUserItem.addItem);
router.route("/item/:id").delete(ctrlUserItem.deleteItem);

module.exports = router;
