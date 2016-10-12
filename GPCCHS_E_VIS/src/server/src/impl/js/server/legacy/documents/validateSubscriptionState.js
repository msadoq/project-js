const ApiError = require('../../lib/utils/apiError');
const constants = require('../../lib/constants');

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.subscriptionState === 'undefined') {
    return next(new ApiError(400, 'subscriptionState required', '/body/subscriptionState'));
  }

  const subscriptionState = req.body.subscriptionState;
  if (subscriptionState !== constants.SUBSCRIPTIONSTATE_PLAY
    && subscriptionState !== constants.SUBSCRIPTIONSTATE_PAUSE) {
    return next(new ApiError(400, 'subscriptionState is invalid', '/body/subscriptionState'));
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, { subscriptionState });

  return next();
};
