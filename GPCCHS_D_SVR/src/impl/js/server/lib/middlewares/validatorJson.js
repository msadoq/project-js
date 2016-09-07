const { validatePG, validateWS, validateTV, validatePV }
= require('../schemaManager/index');
const ApiError = require('../utils/apiError');

module.exports = () => {
  const generateValidator = type => (req, res, next) => {
    let validator;
    if (type === 'page') {
      validator = validatePG;
    } else if (type === 'workspace') {
      validator = validateWS;
    } else if (type === 'textview') {
      validator = validateTV;
    } else if (type === 'plotview') {
      validator = validatePV;
    } else {
      return next(new ApiError(400, 'Unknown JSON type', '/body'));
    }

    const errorValidate = validator(req.validated.filepath);

    if (errorValidate) {
      return next(errorValidate);
    }
    return next();
  };
  return generateValidator();
};
