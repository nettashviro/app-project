import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

//Import User Model
import User from "../models/userSchema";

//Import Secret Key
import { SECRET_OR_KEY } from "./keys";

export default (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET_OR_KEY;

  passport.use(new Strategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User
      .findOne({_id: jwt_payload.user._id})
      .select('name email username _id date')
      .exec()
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        return done(err, false);
      });
  }));
}