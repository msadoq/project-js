// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _defaultsDeep = require('lodash/defaultsDeep');

module.exports = (payload, override) => {
  if (!override) {
    return payload;
  }

  return _defaultsDeep({}, override, payload);
};
