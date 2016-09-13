const ApiError = require('../utils/apiError');
const fs = require('fs');


//TODO: distinction entre TV et PV

module.exports = (req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  const file = req.validated.originalUrl;
  const filepath = req.validated.path;

  fs.access(filepath, fs.constants.F_OK, existError => {
    console.log('entrée dans fs');
    if (existError) {
      // console.log(filepath);
      console.log('err fs => F_OK, file don\'t exist');
      return next(new ApiError(400, 'no access to this file : file don\'t exist', '/body'));
    }
    return fs.access(filepath, fs.constants.R_OK, pathError => {
      if (pathError) {
            // console.log(pathError);
            // console.log(filepath);
        console.log('err fs => R_OK, invalid path');
        return next(new ApiError(400, 'no access to this file: invalid path', '/body'));
      }
      return fs.readFile(file, 'utf8', (readError, raw) => {
            console.log('FILEPATH ds readFIle',filepath);
        if (readError) {
                console.log('err fs => readFile, can\'t read this file');
          return next(new ApiError(400, 'can\'t read this file', '/body'));
        }
        try {
          const content = JSON.parse(raw);
          console.log(raw)
          // eslint-disable-next-line no-param-reassign
          req.validated = Object.assign({}, req.validated, { content });
        } catch (e) {
          return (new ApiError(400, 'invalid JSON in requested file', '/body'));
        }
        return next();
      });
    });
  });
};
