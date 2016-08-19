const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.visuWindow === 'undefined') {
    return next(new ApiError(400, 'visuWindow required', '/body/visuWindow'));
  }
  if (typeof req.body.visuWindow.lower === 'undefined') {
    return next(new ApiError(400, 'visuWindow.lower required', '/body/visuWindow/lower'));
  }
  if (typeof req.body.visuWindow.upper === 'undefined') {
    return next(new ApiError(400, 'visuWindow.upper required', '/body/visuWindow/upper'));
  }

  const lower = parseInt(req.body.visuWindow.lower, 10);
  if (isNaN(lower)) {
    return next(new ApiError(400, 'visuWindow.lower is invalid', '/body/visuWindow/lower'));
  }
  const upper = parseInt(req.body.visuWindow.upper, 10);
  if (isNaN(upper)) {
    return next(new ApiError(400, 'visuWindow.upper is invalid', '/body/visuWindow/upper'));
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, {
    visuWindow: {
      lower,
      upper,
    },
  });

  return next();
};
