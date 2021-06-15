const express = require("express");
const ctrlCustomer = require("../controllers/customer.controller");
const jwtHelper = require("../utils/jwtHelper");

const router = express.Router();

router.route("/").get(ctrlCustomer.users);
router.route("/:id").get(ctrlCustomer.user);
router.route("/current").get(jwtHelper.verifyJwtToken, ctrlCustomer.current);
router.route("/register").post(ctrlCustomer.register);
router.route("/authenticate").post(ctrlCustomer.authenticate);

module.exports = router;
