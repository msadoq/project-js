const ApiError = require('../utils/apiError');
const parseDataFullName = require('../utils/parseDataFullName');

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body.dataFullName === 'undefined') {
    return next(new ApiError(400, 'dataFullName required', '/body/dataFullName'));
  }

  const parsedDataFullName = parseDataFullName(req.body.dataFullName);
  if (!parsedDataFullName) {
    return next(new ApiError(400, 'dataFullName is invalid', '/body/dataFullName'));
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, parsedDataFullName);

  return next();
};
