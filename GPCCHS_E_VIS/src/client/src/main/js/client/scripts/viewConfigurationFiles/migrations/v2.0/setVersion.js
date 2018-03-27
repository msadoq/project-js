
const ViewConfiguration = require('../../models/ViewConfiguration');

module.exports = {
  '*': viewConfiguration => new ViewConfiguration(
    Object.assign(
      {},
      viewConfiguration.content,
      {
        version: '2.0',
      })
  ),
};
