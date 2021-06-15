const jwt = require("jsonwebtoken");
const Customer = require("../models/customer.model");
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
          Customer.findOne({ _id: decoded._id })
            .select("name email username _id date")
            .exec()
            .then((customer) => {
              if (customer) {
                req.customer = customer;
                return next();
              }
              return res.status(500).send({ auth: false, message: "Customer not found." });
            })
            .catch((err) => {
              return res.status(500).send({ auth: false, message: "Token authentication failed." });
            });
        }
      });
    }
  }
};
