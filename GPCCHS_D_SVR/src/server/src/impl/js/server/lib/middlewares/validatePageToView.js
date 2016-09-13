// const pathApi = require('path');
// /* Check if a page contains one or a lot of views */
//
// const reqPathPage = pathApi.join(__dirname, '../../lib/schemaManager/examples/PG.example.json');
//
// module.exports = (req, res, next) => {
//   let thisSchema;
//   if (pathApi.Onload) {
//     thisSchema = JSON.parse(reqPathPage);
//
//     if ('view' in thisSchema !== 'undefined') {
//         // eslint-disable-next-line no-param-reassign
//       req.validated = Object.assign({}, req.validated, { view: '' });
//     }
//   }
//   return next();
// };
