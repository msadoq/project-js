const pathApi = require('path');
const urlApi = require ('url');
/* Check if a workspace contains one or a lot of pages */

const reqPathWKSP = pathApi.join(__dirname, '../../lib/schemaManager/examples/WS.example.json');

module.exports = (req, res, next) => {
  let thisSchema;
  let page = url.parse(req.url).pathname;
  if (page === '/'){

  }

  if (req.body.path) {
  // (pathApi.Onload) {
    thisSchema = JSON.parse(reqPathWKSP);

    if ('page' in thisSchema !== 'undefined') {
        // eslint-disable-next-line no-param-reassign
      req.validated = Object.assign({}, req.validated, { page: '' });
    }
  }
  return next();
};
