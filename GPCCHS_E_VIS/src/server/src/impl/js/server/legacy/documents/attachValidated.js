module.exports = (req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  req.validated = {};
  next();
};
