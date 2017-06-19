// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  apid: 100,
  rid: 100,
  actionStatus: 100,
  actionTcPacketHeader: Buffer.alloc(10, 1),
  pusElement: getPusElement(),
}, override);

