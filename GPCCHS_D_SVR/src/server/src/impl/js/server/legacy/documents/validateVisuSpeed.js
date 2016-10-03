const ApiError = require('../../lib/utils/apiError');

const defaultValue = 0;

module.exports = (req, res, next) => {
  let visuSpeed;
  if (!req.body || typeof req.body.visuSpeed === 'undefined') {
    visuSpeed = defaultValue;
  } else {
    visuSpeed = parseInt(req.body.visuSpeed, 10);
    if (isNaN(visuSpeed) || visuSpeed < 0) {
      return next(new ApiError(400, 'visuSpeed is invalid', '/body/visuSpeed'));
    }
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, { visuSpeed });

  return next();
};
