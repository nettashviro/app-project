const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { SECRET_KEY } = require("../config");

module.exports.verifyJwtToken = (req, res, next) => {
  let token;
  if ("authorization" in req.headers) {
    token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      res.status(403).send({ auth: false, message: "No token provided." });
    } else {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: "Token authentication failed." });
        else {
          User.findOne({ _id: decoded._id })
            .select("name email username _id date")
            .exec()
            .then((user) => {
              if (user) {
                req.user = user;
                return next();
              }
              return res.status(500).send({ auth: false, message: "User not found." });
            })
            .catch((err) => {
              return res.status(500).send({ auth: false, message: "Token authentication failed." });
            });
        }
      });
    }
  }
};
