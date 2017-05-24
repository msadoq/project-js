// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus013LdtPart = require('./pus013LdtPart');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  startTime: now,
  endTime: now,
  transferType: 100,
  lduId: 100,
  status: 100,
  size: 100,
  remainingSize: -100,
  percent: 100,
  failureCode: 100,
  fileId: 100,
  partitionId: 100,
  fileChecksum: 'mySTRING',
  fileTypeCode: 100,
  pUS013LdtPart: [getPus013LdtPart(), getPus013LdtPart()],
  noLDTParts: 100,
  pusElement: getPusElement(),
}, override);

