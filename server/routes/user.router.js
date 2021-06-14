const express = require("express");
const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../utils/jwtHelper");

const router = express.Router();

router.route("/").get(ctrlUser.users);
router.route("/:id").get(ctrlUser.user);
router.route("/current").get(jwtHelper.verifyJwtToken, ctrlUser.current);
router.route("/register").post(ctrlUser.register);
router.route("/authenticate").post(ctrlUser.authenticate);

module.exports = router;
