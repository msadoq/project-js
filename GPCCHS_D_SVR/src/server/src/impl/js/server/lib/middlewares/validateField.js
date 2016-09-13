module.exports = (req, res, next) => {
  if (req.body && typeof req.body.field === 'string' && req.body.field !== '') {
    // eslint-disable-next-line no-param-reassign
    req.validated = Object.assign({}, req.validated, { field: req.body.field });
  }

  return next();
};
