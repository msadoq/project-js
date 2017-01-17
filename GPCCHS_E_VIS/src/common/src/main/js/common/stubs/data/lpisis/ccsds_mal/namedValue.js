// Generated file
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');


module.exports = override => applyOverride({
  name: Buffer('myIDENTIFIER'),
  value: _random(1, 100, true),
}, override);

