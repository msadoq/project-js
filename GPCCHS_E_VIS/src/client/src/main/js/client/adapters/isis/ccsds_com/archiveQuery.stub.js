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
const getObjectId = require('./objectId.stub');

const now = _now();

const archiveQuery = {
  domainID: 10,
  slotId: 10,
  providerId: 10,
  related: -1000,
  source: getObjectId(),
  startTime: now + 1,
  endTime: now + 1,
  sortOrder: true,
  sortFieldName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, archiveQuery) : archiveQuery);
