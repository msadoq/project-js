const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.domainId === 'undefined') {
    return next(new ApiError(400, 'domainId required', '/body/domainId'));
  }

  const domainId = parseInt(req.body.domainId, 10);
  if (isNaN(domainId) || domainId < 0) {
    return next(new ApiError(400, 'domainId is invalid', '/body/domainId'));
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, { domainId });

  return next();
};
