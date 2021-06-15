const mongoose = require("mongoose");
const Customer = require("../models/customer.model");

const customers = (req, res, next) => {
  Customer.find({})
    .exec()
    .then((customers) => {
      if (customers.length < 1)
        return res.status(404).json({ message: `customers not found...` });
      return res.status(200).json({ customers: customers });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const authenticate = (req, res, next) => {
  Customer.findOne({ username: req.body.username })
    .exec()
    .then((customer) => {
      if (!customer) {
        return res.status(409).json({ message: `customer not found...` });
      } else {
        const isMatch = customer.verifyPassword(req.body.password);
        if (isMatch) {
          const token = customer.generateJwt();
          return res.status(200).json({
            customer: {
              name: customer.name,
              email: customer.email,
              username: customer.username,
              date: customer.date,
              id: customer._id,
              isAdmin: customer.isAdmin,
            },
            token: `Bearer ${token}`,
          });
        }

        return res.status(409).json({ message: `password is not match...` });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const register = (req, res, next) => {
  // Check if there is already user with this mail address
  Customer.find({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (customer.length >= 1) {
        return res
          .status(409)
          .json({ error: "Duplicate email adrress found." });
      } else {
        // Check if there is already user with this username
        Customer.find({ username: req.body.username })
          .exec()
          .then((customer) => {
            if (customer.length >= 1) {
              return res
                .status(409)
                .json({ error: `Duplicate username found.` });
            } else {
              let customer = new Customer({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
              });
              return customer
                .save()
                .then((customer) => {
                  return res.status(200).json({ success: true, customer });
                })
                .catch((err) => {
                  return res.status(500).json(err);
                });
            }
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const current = (req, res, next) => {
  let currentCustomer = req.customer;
  if (!currentCustomer)
    return res.status(403).json({ message: "current customer not found..." });

  return res.status(200).json(req.customer);
};

const customer = (req, res, next) => {
  Customer.findById({ _id: req.params.id }, (err, customer) => {
    if (!customer)
      return res
        .status(404)
        .json({ status: false, message: "Customer record not found." });
    else
      return res.status(200).json({
        status: true,
        customer: _.pick(customer, ["fullName", "email"]),
      });
  });
};

module.exports = {
  customers,
  authenticate,
  current,
  register,
  customer,
};
