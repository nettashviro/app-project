const express = require("express");
const jwtHelper = require("../utils/jwtHelper");
const ctrlIndex = require("../controllers/index.controller");

const router = express.Router();

router.route("/dashboard").get(jwtHelper.verifyJwtToken, ctrlIndex.dashboard);

module.exports = router;
