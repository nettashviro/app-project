module.exports.dashboard = (req, res, next) => {
  return res.status(200).json(req.user);
};
