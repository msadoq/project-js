const { validatePgJson, validateWsJson, validateTvJson, validatePvJson }
= require('../schemaManager/index');
const ApiError = require('../utils/apiError');

module.exports = type => (req, res, next) => {
  // console.log('entrée dans Validator');
  let validator;
  if (type === 'page') {
    validator = validatePgJson;
  } else if (type === 'workspace') {
    validator = validateWsJson;
  } else if (type === 'textview') {
    validator = validateTvJson;
  } else if (type === 'plotview') {
    validator = validatePvJson;
  } else {
    return next(new ApiError(400, 'Unknown JSON type', '/body'));
  }
  // console.log(validator);
  const errorValidate = validator(req.validated.content);
  if (errorValidate) {
    return next(new ApiError(400, 'invalid JSON', '/body'));
  }
  return next();
};
