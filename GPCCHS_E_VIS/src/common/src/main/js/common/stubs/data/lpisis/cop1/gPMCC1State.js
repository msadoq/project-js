// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getProccessedTC = require('./proccessedTC');

module.exports = override => applyOverride({
  proccessedTC: [getProccessedTC(), getProccessedTC()],
}, override);

