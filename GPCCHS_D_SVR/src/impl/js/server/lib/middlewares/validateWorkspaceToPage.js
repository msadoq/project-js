const pathApi = require('path');
/* Check if a workspace contains one or a lot of pages */

const reqPathWKSP = pathApi.join(__dirname, '../../lib/schemaManager/examples/WS.example.json');

module.exports = (req, res, next) => {
  let thisSchema;
  if (pathApi.Onload) {
    thisSchema = JSON.parse(reqPathWKSP);

    if ('page' in thisSchema !== 'undefined') {
        // eslint-disable-next-line no-param-reassign
      req.validated = Object.assign({}, req.validated, { page: '' });
    }
  }
  return next();
};
