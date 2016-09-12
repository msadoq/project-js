const ApiError = require('../utils/apiError');
const fs = require('fs');

module.exports = (req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  const filepath = req.validated.path;

  fs.access(filepath, fs.constants.F_OK && fs.constants.R_OK, err => {
    if (err) {
      return next(new ApiError(400, 'no access to this file', '/body'));
    }

    return fs.readFile(filepath, 'utf8', (readError, raw) => {
      if (readError) {
        return next(new ApiError(400, 'can\'t read this file', '/body'));
      }

      try {
        const content = JSON.parse(raw);
        // eslint-disable-next-line no-param-reassign
        req.validated = Object.assign({}, req.validated, { content });
      } catch (e) {
        return next(new ApiError(400, 'Invalid JSON in requested file', '/body'));
      }

      return next();
    });
  });
};
