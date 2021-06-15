const express = require("express");
const jwtHelper = require("../utils/jwtHelper");
const ctrlSales = require("../controllers/customerItem.controller");

const router = express.Router();

router.route("/items").get(ctrlSales.items);
router.route("/item/:id").get(ctrlSales.userItems);
router.route("/item/add").post(jwtHelper.verifyJwtToken, ctrlSales.addItem);
router.route("/item/:id").delete(ctrlSales.deleteItem);

module.exports = router;
