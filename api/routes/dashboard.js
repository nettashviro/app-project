import express from "express";
import passport from "passport";

const router = express.Router();

//@Protect DashBoard
//@Private Route
router.route('/dashboard').get(passport.authenticate('jwt',{session: false}), (req, res, next) => {
  return res.status(200).json(req.user);
});


export default router;