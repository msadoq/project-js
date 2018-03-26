
const ViewConfiguration = require('../../ViewConfiguration');

module.exports = {
  '*': configurationFile => new ViewConfiguration({
    ...configurationFile.content,
    version: '2.0',
  }),
};
