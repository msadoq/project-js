// Generated file
const applyOverride = require('../../applyOverride');
const getProccessedTC = require('./proccessedTC');

module.exports = override => applyOverride({
  proccessedTC: [getProccessedTC(), getProccessedTC()],
}, override);

