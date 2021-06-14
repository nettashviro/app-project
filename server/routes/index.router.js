const express = require("express");
const passport = require("passport");
const ctrlIndex = require("../controllers/index.controller");

const router = express.Router();

router.route("/dashboard").get(passport.authenticate("jwt", { session: false }), ctrlIndex.dashboard);

module.exports = router;
