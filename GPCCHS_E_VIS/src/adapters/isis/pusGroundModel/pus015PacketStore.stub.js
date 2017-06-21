// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus015Packet = require('./pus015Packet.stub');
const getPusElement = require('./pusElement.stub');

const pus015PacketStore = {
  name: 'mySTRING',
  id: 100,
  status: 100,
  storageType: 100,
  dumpEnabled: true,
  pus015Packet: [getPus015Packet(), getPus015Packet()],
  pusElement: getPusElement(),
  hkStatusParameterName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015PacketStore) : pus015PacketStore);
