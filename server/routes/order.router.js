const express = require("express");
const ctrlOrder = require("../controllers/order.controller");

const router = express.Router();

router.route("/getOrders").get(ctrlOrder.getOrders);
router.route("/getUserOrders/:userId").get(ctrlOrder.getUserOrders);
router.route("/addOrder").post(ctrlOrder.addNewOrder);
router.route("/deleteOrder").delete(ctrlOrder.deleteOrder);
router.route("/updateOrder").put(ctrlOrder.updateOrder);
router.route("/totalIncomes").get(ctrlOrder.getStoreIncomes);
module.exports = router;