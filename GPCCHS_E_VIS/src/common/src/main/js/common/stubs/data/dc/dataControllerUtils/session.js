const applyOverride = require('../../applyOverride');

const { getTimestamp } = require('./timestamp');

const getSession = override => applyOverride({
  name: 'Master',
  id: 0,
  timestamp: getTimestamp(),
  delta: 0,
}, override);

module.exports = {
  getSession,
};
