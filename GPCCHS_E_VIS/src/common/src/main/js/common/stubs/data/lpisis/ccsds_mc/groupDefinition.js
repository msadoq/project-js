// Generated file
const applyOverride = require('../../applyOverride');
const getObjectType = require('../ccsds_com/objectType');

module.exports = override => applyOverride({
  name: 'myIDENTIFIER',
  description: 'mySTRING',
  objectType: getObjectType(),
  domain: 10,
  instanceIds: [-1000, -1000],
}, override);

