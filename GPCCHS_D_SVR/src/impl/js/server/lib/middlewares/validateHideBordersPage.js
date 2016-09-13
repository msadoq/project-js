const ApiError = require('../utils/apiError');
/* first param required of page schema : hideBorders to FALSE */

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.hideBorders === 'undefined') {
    return next(new ApiError(400, 'hideBorders required', '/body/hideBorders'));
  }
  if (req.body.hideBorders === true) {
    return next(new ApiError(400, 'hideBorders have to be false', '/body/hideBorders'));
  }
  if (req.body.hideBorders === 5) {
    return next(new ApiError(400, 'bad type for hideBorders', '/body/hideBorders'));
  }

  // eslint-disable-next-line no-param-reassign
  // req.validated = Object.assign({}, req.validated, { hideBorders: false });

  return next();
};
