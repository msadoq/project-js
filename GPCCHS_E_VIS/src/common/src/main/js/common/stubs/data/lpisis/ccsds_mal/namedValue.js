const applyOverride = require('../../applyOverride');

module.exports = override => applyOverride({
  name: 'myIDENTIFIER',
  value: 42,
}, override);
