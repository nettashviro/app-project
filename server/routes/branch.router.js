const express = require("express");
const ctrlBranch = require("../controllers/branch.controller");

const router = express.Router();
router.route("/").get(ctrlBranch.getBranches);

module.exports = router;
