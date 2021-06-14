const express = require("express");
const passport = require("passport");
const ctrlUser = require("../controllers/user.controller");

const router = express.Router();

router.route("/getall").get(ctrlUser.users);
router.route("/current").get(passport.authenticate("jwt", { session: false }), ctrlUser.current);
router.route("/register").post(ctrlUser.register);
router.route("/authenticate").post(ctrlUser.authenticate);

module.exports = router;
