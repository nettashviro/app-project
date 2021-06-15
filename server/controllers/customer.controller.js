const mongoose = require("mongoose");
const Customer = require("../models/customer.model");

module.exports.users = (req, res, next) => {
  Customer.find({})
    .exec()
    .then((users) => {
      if (users.length < 1) return res.status(404).json({ message: `users not found...` });
      return res.status(200).json({ users: users });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.authenticate = (req, res, next) => {
  Customer.findOne({ username: req.body.username })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(409).json({ message: `user not found...` });
      } else {
        const isMatch = user.verifyPassword(req.body.password);
        if (isMatch) {
          const token = user.generateJwt();
          return res.status(200).json({
            user: {
              name: user.name,
              email: user.email,
              username: user.username,
              date: user.date,
              id: user._id,
              isAdmin: user.isAdmin,
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

module.exports.register = (req, res, next) => {
  // Check if there is already user with this mail address
  Customer.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ error: "Duplicate email adrress found." });
      } else {
        // Check if there is already user with this username
        Customer.find({ username: req.body.username })
          .exec()
          .then((user) => {
            if (user.length >= 1) {
              return res.status(409).json({ error: `Duplicate username found.` });
            } else {
              let user = new Customer({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
              });
              return user
                .save()
                .then((user) => {
                  return res.status(200).json({ success: true, user: user });
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

module.exports.current = (req, res, next) => {
  let currentUser = req.user;
  if (!currentUser) return res.status(403).json({ message: "current user not found..." });

  return res.status(200).json(req.user);
};

module.exports.user = (req, res, next) => {
  Customer.findById({ _id: req.params.id }, (err, user) => {
    if (!user) return res.status(404).json({ status: false, message: "Customer record not found." });
    else return res.status(200).json({ status: true, user: _.pick(user, ["fullName", "email"]) });
  });
};
