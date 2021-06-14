const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, JWT_EXP } = require("../config");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    match: /^[a-zA-Z ]{2,30}$/,
    required: [true, "name is required...!"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "email is required...!"],
  },
  username: {
    type: String,
    match: /^[a-zA-Z0-9]+$/,
    unique: true,
    required: [true, "username is required...!"],
  },
  password: {
    type: String,
    required: [true, "password is required...!"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  saltSecret: String,
});

// Custom validation for email
userSchema.path("email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

//Encrypt the password
userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, SECRET_KEY, {
    expiresIn: JWT_EXP,
  });
};

module.exports = mongoose.model("User", userSchema);
