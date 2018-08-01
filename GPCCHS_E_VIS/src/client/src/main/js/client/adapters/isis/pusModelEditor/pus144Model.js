// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus144OnboardFile = require('./pus144OnboardFile');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    pus144OnboardFiles: _map(data.pus144OnboardFiles, d => (pus144OnboardFile.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
  }),
  decode: data => ({
    pus144OnboardFiles: _map(data.pus144OnboardFiles, d => (pus144OnboardFile.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
  }),
};
