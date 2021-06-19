const mongoose = require("mongoose");
const User = require("../models/user.model");
const _ = require('lodash')

const users = (req, res, next) => {
    User.find({})
        .exec()
        .then((users) => {
            if (users.length < 1) return res.status(404).json({ message: `users not found...` });
            return res.status(200).json({ users: users });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const authenticate = (req, res, next = () => {}) => {
    User.findOne({ username: req.body.username })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(409).json({ message: `user not found...` });
            } else {
                const isMatch = user.verifyPassword(req.body.password);
                if (isMatch) {
                    const token = user.generateJwt();
                    res.locals.user = user
                    next()
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

const register = (req, res, next) => {
    // Check if there is already user with this mail address
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({ error: "Duplicate email adrress found." });
            } else {
                // Check if there is already user with this username
                User.find({ username: req.body.username })
                    .exec()
                    .then((user) => {
                        if (user.length >= 1) {
                            return res.status(409).json({ error: `Duplicate username found.` });
                        } else {
                            let user = new User({
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

const current = (req, res, next) => {
    let currentUser = req.user;
    if (!currentUser) return res.status(403).json({ message: "current user not found..." });

    return res.status(200).json(req.user);
};

const user = (req, res, next) => {
    console.log("req.params.id", req.params.id)
    User.findById({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
        if (!user) return res.status(404).json({ status: false, message: "User record not found." });
        else return res.status(200).json({ status: true, user: _.pick(user, ["fullName", "email"]) });
    });
};

module.exports = {
    users,
    authenticate,
    register,
    current,
    user
}