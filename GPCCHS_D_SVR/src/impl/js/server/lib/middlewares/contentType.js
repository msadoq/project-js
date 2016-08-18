module.exports = (req, res, next) => {
  res.type('application/vnd.api+json');
  next();
};
