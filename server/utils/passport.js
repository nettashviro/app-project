const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const { SECRET_KEY } = require("../config");
const User = require("../models/user.model");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET_KEY;

  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.user._id })
        .select("name email username _id date")
        .exec()
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
