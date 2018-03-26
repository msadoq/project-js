
const ViewConfiguration = require('../../ViewConfiguration');

module.exports = {
  '*': viewConfiguration => new ViewConfiguration({
    ...viewConfiguration.content,
    version: '2.0',
  }),
};
