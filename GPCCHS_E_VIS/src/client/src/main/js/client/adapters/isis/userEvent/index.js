// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ExternalEvent = require('./externalEvent');
const UserEvent = require('./userEvent');

module.exports = {
  ExternalEvent: { type: 'protobuf', adapter: ExternalEvent },
  UserEvent: { type: 'protobuf', adapter: UserEvent },
};
