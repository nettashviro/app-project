const express = require("express");
const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../utils/jwtHelper");
const ctrlConnections = require('../utils/connectionsHandler')
const router = express.Router();

router.route("/").get(ctrlUser.users);
router.route("/:id").get(ctrlUser.user);
router.route("/current").get(jwtHelper.verifyJwtToken, ctrlUser.current);
router.route("/register").post(ctrlUser.register);
router.route("/authenticate").post(ctrlUser.authenticate, ctrlConnections.logConnection);
router.route("/connections/count").get(ctrlConnections.approximateUniqueConnections);
module.exports = router;
