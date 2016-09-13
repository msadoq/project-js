const ApiError = require('../utils/apiError');
const constants = require('../constants');

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.timeLineType === 'undefined') {
    return next(new ApiError(400, 'timeLineType required', '/body/timeLineType'));
  }

  const timeLineType = req.body.timeLineType;
  if (timeLineType !== constants.TIMELINETYPE_SESSION
    && timeLineType !== constants.TIMELINETYPE_DATASET
    && timeLineType !== constants.TIMELINETYPE_RECORDSET) {
    return next(new ApiError(400, 'timeLineType is invalid', '/body/timeLineType'));
  }

  const clean = { timeLineType };

  if (timeLineType === constants.TIMELINETYPE_SESSION) {
    if (typeof req.body.sessionId === 'undefined') {
      return next(new ApiError(400, 'sessionId required', '/body/sessionId'));
    }
    // TODO : validate sessionId format
    clean.sessionId = req.body.sessionId;
  }

  if (req.body.timeLineType === constants.TIMELINETYPE_DATASET
    || req.body.timeLineType === constants.TIMELINETYPE_RECORDSET) {
    if (typeof req.body.setFileName === 'undefined') {
      return next(new ApiError(400, 'setFileName required', '/body/setFileName'));
    }
    // TODO : validate setFileName format
    clean.setFileName = req.body.setFileName;
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, clean);

  return next();
};
