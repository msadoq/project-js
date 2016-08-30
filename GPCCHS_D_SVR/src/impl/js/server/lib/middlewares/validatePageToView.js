const ApiError = require('../utils/apiError');
/* */
// const =
module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.views === 'undefined') {
    return next(new ApiError(400, 'views required', '/body/views'));
  }
  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, { views: 'tructruc' });

  return next();
};
