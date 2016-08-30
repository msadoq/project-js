const ApiError = require('../utils/apiError');
const fs = require('fs');

module.exports = (req, res, next) => {
  /* FILE FOR A WORKSPACE */
  // eslint-disable-next-line no-param-reassign
  const reqValidatedPath = req.validated.path;

  try {
    fs.accessSync(reqValidatedPath, fs.constants.F_OK && fs.constants.R_OK);
  } catch (e) {
    return next(new ApiError(400, 'no access to this file', '/body'));
  }
  let val;
  try {
    val = JSON.parse(fs.readFileSync(reqValidatedPath, 'utf8'));
  } catch (e) {
    return next(new ApiError(400, 'can/t read this file', '/body'));
  }

  // eslint-disable-next-line no-param-reassign
  req.validated = Object.assign({}, req.validated, { content: val });


  return next();
};
 /* TODO => FILE FOR A PAGE ? (with params path or oId)*/

 /* TODO => FILE FOR A TEXTVIEW ? (warning : no params path or oId for the views)  */
