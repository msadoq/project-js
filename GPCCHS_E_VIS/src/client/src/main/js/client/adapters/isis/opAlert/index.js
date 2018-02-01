// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const OpAlert = require('./opAlert');
const OpAlertClosingData = require('./opAlertClosingData');
const OpAlertConfiguration = require('./opAlertConfiguration');

module.exports = {
  OpAlert: { type: 'protobuf', adapter: OpAlert },
  OpAlertClosingData: { type: 'protobuf', adapter: OpAlertClosingData },
  OpAlertConfiguration: { type: 'protobuf', adapter: OpAlertConfiguration },
};
