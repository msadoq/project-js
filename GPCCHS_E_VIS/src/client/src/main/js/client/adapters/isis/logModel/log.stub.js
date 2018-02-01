// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const log = {
  logBookEventDefinitionName: 'mySTRING',
  objectTypeArea: 10,
  objectTypeService: 10,
  objectTypeNumber: 10,
  objectTypeVersion: 1,
  channels: 1,
  level: 1,
  criticity: 'mySTRING',
  authId: Buffer.alloc(4, 1),
  userName: 'mySTRING',
  userProfileId: 10,
  userProfileName: 'mySTRING',
  pattern: 'mySTRING',
  systemDate: now,
  specificAttributes: 'mySTRING',
  eventDate: now,
  mission: 'mySTRING',
  satellite: 1,
  providerId: 10,
  providerName: 'mySTRING',
  source: 'mySTRING',
  service: 'mySTRING',
  sessionId: 10,
  sessionName: 'mySTRING',
  slotId: 10,
  domainId: 10,
};

module.exports = override => (override ? _defaultsDeep({}, override, log) : log);
