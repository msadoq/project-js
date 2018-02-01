// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const lONG = require('../ccsds_mal/lONG');
const objectType = require('../ccsds_com/objectType');
const sTRING = require('../ccsds_mal/sTRING');
const uSHORT = require('../ccsds_mal/uSHORT');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.encode(data.name)
      : null,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.encode(data.description)
      : null,
    objectType: (data.objectType !== null && typeof data.objectType !== 'undefined')
      ? bLOB.encode(objectType.encodeRaw(data.objectType))
      : null,
    domain: (data.domain !== null && typeof data.domain !== 'undefined')
      ? uSHORT.encode(data.domain)
      : null,
    instanceIds: _map(data.instanceIds, d => (lONG.encode(d))),
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.decode(data.name)
      : undefined,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.decode(data.description)
      : undefined,
    objectType: (data.objectType !== null && typeof data.objectType !== 'undefined')
      ? objectType.decodeRaw(bLOB.decode(data.objectType).value)
      : undefined,
    domain: (data.domain !== null && typeof data.domain !== 'undefined')
      ? uSHORT.decode(data.domain)
      : undefined,
    instanceIds: _map(data.instanceIds, d => (lONG.decode(d))),
  }),
};
