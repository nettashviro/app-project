const express = require("express");
const ctrlOrder = require("../controllers/order.controller");

const router = express.Router();

router.route("/getOrders").get(ctrlOrder.getOrders);
router.route("/addOrder").post(ctrlOrder.addNewOrder);
router.route("/deleteOrder").delete(ctrlOrder.deleteOrder);
router.route("/updateOrder").update(ctrlOrder.updateOrder);

module.exports = router;