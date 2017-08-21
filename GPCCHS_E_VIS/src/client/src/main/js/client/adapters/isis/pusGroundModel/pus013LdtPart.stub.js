// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus013LdtPart = {
  status: 100,
  partSize: 100,
  partId: 100,
  sourceId: 100,
  commandApid: 100,
  sequenceCount: 100,
  serviceDataUnit: Buffer.alloc(4, 1),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013LdtPart) : pus013LdtPart);
