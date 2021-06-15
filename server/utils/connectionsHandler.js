const mongoose = require("mongoose");
const Connections = require("../models/connections.model");
const HyperLogLog = require("../services/HLLDistinctAproximation")
const hll = HyperLogLog(10);

// Runs on service start
Connections.find({}, (err, connections) => {
  for (const connection of connections) {
    hll.add(HyperLogLog.hash(connection.userId.toString()))
  }
})


const logConnection = (req, res, next) => {
  if(!res.locals.user)
    throw { error: 'user exception' }
  let connection = new Connections({
    _id: new mongoose.Types.ObjectId(),
    userId: res.locals.user._id
  });

  connection.save()
    .then( _ => {
      hll.add(HyperLogLog.hash(res.locals.user._id.toString()))
    })
}

const approximateUniqueConnections = (req, res, next) => {
  return res.status(200).json({
    connectionsCount: hll.count()
  })
}

module.exports = {
  logConnection,
  approximateUniqueConnections
}