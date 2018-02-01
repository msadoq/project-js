// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const applyOverride = require('../applyOverride');

const { getTimestamp } = require('./timestamp.stub');

const getSession = override => applyOverride({
  name: 'Master',
  id: 0,
  timestamp: getTimestamp(),
}, override);

module.exports = {
  getSession,
};
