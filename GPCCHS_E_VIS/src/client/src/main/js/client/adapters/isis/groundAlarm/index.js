// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Transition = require('./transition');
const GroundMonitoringAlarm = require('./groundMonitoringAlarm');
const TransportedGroundAlarm = require('./transportedGroundAlarm');

module.exports = {
  Transition: { type: 'protobuf', adapter: Transition },
  GroundMonitoringAlarm: { type: 'protobuf', adapter: GroundMonitoringAlarm },
  TransportedGroundAlarm: { type: 'protobuf', adapter: TransportedGroundAlarm },
};
