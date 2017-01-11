const applyOverride = require('../../applyOverride');

module.exports = override => applyOverride({
  name: Buffer('myNamedValue'),
  value: 42,
}, override);
