const express = require("express");
const ctrlOrder = require("../controllers/order.controller");

const router = express.Router();

router.route("/getOrders").get(ctrlItem.getOrders);

module.exports = router;
