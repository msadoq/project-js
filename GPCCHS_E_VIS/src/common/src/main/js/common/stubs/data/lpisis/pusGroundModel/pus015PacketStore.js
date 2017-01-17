// Generated file
const applyOverride = require('../../applyOverride');
const getPus015Packet = require('./pus015Packet');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  name: 'mySTRING',
  id: 100,
  status: 100,
  storageType: 100,
  dumpEnabled: true,
  pus015Packet: [getPus015Packet(), getPus015Packet()],
  pusElement: getPusElement(),
  hkStatusParameterName: 'mySTRING',
}, override);

