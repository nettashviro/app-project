const mongoose = require("mongoose");
const Connections = require("../models/connections.model");
const HyperLogLog = require("../services/HLLDistinctAproximation");
const hll = HyperLogLog(10);

// Runs on service start
Connections.find({}, (err, connections) => {
  for (const connection of connections) {
    hll.add(HyperLogLog.hash(connection.userId.toString()));
  }
});

const logConnection = (req, res, next) => {
  if (!res.locals.user) throw { error: "user exception" };
  let connection = new Connections({
    _id: new mongoose.Types.ObjectId(),
    userId: res.locals.user._id,
  });
  connection.save().then((_) => {
    hll.add(HyperLogLog.hash(res.locals.user._id.toString()));
  });
};

const approximateUniqueConnections = (req, res, next) => {
  return res.status(200).json({
    connectionsCount: hll.count(),
  });
};

const connectionsGroupByHour = (req, res, next) => {
  Connections.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$time" },
          dayOfMonth: { $dayOfMonth: "$time" },
          year: { $year: "$time" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.dayOfMonth": 1 } },
    {
      $addFields: {
        _id: {
          $concat: [
            { $toString: "$_id.dayOfMonth" },
            "/",
            { $toString: "$_id.month" },
            "/",
            { $toString: "$_id.year" },
          ],
        },
      },
    },
  ])
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(500).json(err);
    });
};

module.exports = {
  logConnection,
  approximateUniqueConnections,
  connectionsGroupByHour,
};
