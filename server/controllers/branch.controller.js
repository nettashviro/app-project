const Branch = require("../models/branch.model");
const mongoose = require("mongoose");

const getBranches = (req, res, next) => {
  Branch.find()
    .exec()
    .then((branches) => {
      if (branches.length < 1) {
        return res.status(404).json({ message: `branches not found...` });
      } else {
        return res.status(200).json(branches);
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports = {
  getBranches,
};
