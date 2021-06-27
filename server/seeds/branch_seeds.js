const Branch = require("../models/branch.model");
const mongoose = require("mongoose");
require("../utils/database");

Branch.find({ address: "אלי ויזל 2, ראשון לציון" })
  .exec()
  .then((branch) => {
    if (branch.length < 1) {
      let newBranch = new Branch({
        _id: new mongoose.Types.ObjectId(),
        latitude: 31.969967312361632,
        longitude: 34.77096515796263,
        address: "אלי ויזל 2, ראשון לציון",
      });
      newBranch.save((err, doc) => {
        if (err) console.log(err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("there is already product seeds");
  });

Branch.find({ address: "הרצל 41, חיפה" })
  .exec()
  .then((branch) => {
    if (branch.length < 1) {
      let newBranch = new Branch({
        _id: new mongoose.Types.ObjectId(),
        latitude: 32.80981449761546,
        longitude: 34.99911777297785,
        address: "הרצל 41, חיפה",
      });
      newBranch.save((err, doc) => {
        if (err) console.log(err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("there is already product seeds");
  });
