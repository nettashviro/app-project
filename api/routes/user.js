import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import passport from "passport";

//Import User Model
import User from "../models/userSchema";

//Import Secret Key
import { SECRET_OR_KEY } from "../config/keys";

const router = express.Router();

//Register Users...................
router.route('/register').post((req, res, next) => {
  User
    .find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: `invalid email id...`
        });
      } else {
        User
          .find({username: req.body.username})
          .exec()
          .then(user => {
            if (user.length >= 1) {
              return res.status(409).json({
                error: `invalid username...`
              });
            } else {
              //Encrypt the password
              bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).json(err);
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if (err) return res.status(500).json(err);
                  let user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: hash
                  });
                  return user
                    .save()
                    .then(user => {
                      return res.status(200).json({
                        success: true,
                        user: user
                      });
                    })
                    .catch(err => {
                      return res.status(500).json(err);
                    });
                });
              });
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Get All Of The Users............................
router.route('/getall').get((req, res, next) => {
  User
    .find()
    .sort({date: -1})
    .select('name email username date _id')
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(404).json({
          message: `users not found...`
        });
      } else {
        return res.status(200).json({
          users: users
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Login User.........................
router.route('/authenticate').post((req, res, next) => {
  User
    .findOne({username: req.body.username})
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          message: `user not found...`
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) return res.status(500).json(err);
          if (isMatch) {
            let token = jwt.sign(
              {user},
              SECRET_OR_KEY,
              {
                expiresIn: '1h'
              }
            );
            return res.status(200).json({
              user: {
                name: user.name,
                email: user.email,
                username: user.username,
                date: user.date,
                id: user._id
              },
              token: `Bearer ${token}`
            });
          }
          return res.status(409).json({
            message: `password is not match...`
          });
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Return The Current User.....................
router.route('/current').get(passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let currentUser = req.user;
  if (!currentUser) {
    return res.status(403).json({
      message: 'current user not found...'
    });
  }
  return res.status(200).json(req.user);
});


export default router;