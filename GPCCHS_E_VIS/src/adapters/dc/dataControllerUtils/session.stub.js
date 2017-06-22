const applyOverride = require('../applyOverride');

const { getTimestamp } = require('./timestamp.stub');

const getSession = override => applyOverride({
  name: 'Master',
  id: 0,
  timestamp: getTimestamp(),
  delta: 0,
  missionEpoch: 110,
}, override);

module.exports = {
  getSession,
};
