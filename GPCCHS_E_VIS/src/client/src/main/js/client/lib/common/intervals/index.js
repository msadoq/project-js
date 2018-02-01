// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

const includesTimestamp = require('./includesTimestamp');
const merge = require('./merge');
const missing = require('./missing');
const notIncluded = require('./notIncluded');
const remove = require('./remove');

module.exports = {
  includesTimestamp,
  merge,
  missing,
  notIncluded,
  remove,
};
