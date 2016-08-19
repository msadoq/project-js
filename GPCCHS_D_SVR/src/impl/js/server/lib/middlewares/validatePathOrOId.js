const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {
  if (!req.body || (typeof req.body.path === 'undefined' && typeof req.body.oId === 'undefined')) {
    return next(new ApiError(400, 'path or oId required', '/body'));
  }
  if (typeof req.body.path !== 'undefined' && typeof req.body.id !== 'undefined') {
    return next(new ApiError(400, 'path OR oId is required (not both)', '/body'));
  }

  // TODO : impement additional test for path and id validity

  if (typeof req.body.path !== 'undefined') {
    // eslint-disable-next-line no-param-reassign
    req.validated = Object.assign({}, req.validated, { path: req.body.path });
  } else {
    // eslint-disable-next-line no-param-reassign
    req.validated = Object.assign({}, req.validated, { oId: req.body.oId });
  }

  return next();
};
