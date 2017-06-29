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
