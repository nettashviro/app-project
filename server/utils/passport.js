const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const { SECRET_KEY } = require("../config");
const Customer = require("../models/customer.model");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET_KEY;

  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      Customer.findOne({ _id: jwt_payload.customer._id })
        .select("name email username _id date")
        .exec()
        .then((customer) => {
          if (customer) {
            return done(null, customer);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
