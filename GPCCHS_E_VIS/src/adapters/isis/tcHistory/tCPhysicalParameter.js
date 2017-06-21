// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const pusHeader = require('./pusHeader');
const tCDetailType = require('./tCDetailType');
const tCPhysicalParameter = require('./tCPhysicalParameter');

module.exports = {
  encode: data => ({
    argumentIdentifier: (data.argumentIdentifier !== null && typeof data.argumentIdentifier !== 'undefined')
      ? iDENTIFIER.encode(data.argumentIdentifier)
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.encode(data.value)
      : null,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? bOOLEAN.encode(data.valueIsRaw)
      : null,
    tcDetailsType: (data.tcDetailsType !== null && typeof data.tcDetailsType !== 'undefined')
      ? data.tcDetailsType
      : null,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.encode(data.pusHeader)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.encode(data.rawPacket)
      : null,
    tcPhysicalParameter: _map(data.tcPhysicalParameter, d => (tCPhysicalParameter.encode(d))),
  }),
  decode: data => ({
    argumentIdentifier: (data.argumentIdentifier !== null && typeof data.argumentIdentifier !== 'undefined')
      ? iDENTIFIER.decode(data.argumentIdentifier)
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.decode(data.value)
      : undefined,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? bOOLEAN.decode(data.valueIsRaw)
      : undefined,
    tcDetailsType: (data.tcDetailsType !== null && typeof data.tcDetailsType !== 'undefined')
      ? { type: 'enum', value: data.tcDetailsType, symbol: tCDetailType[data.tcDetailsType] }
      : undefined,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.decode(data.rawPacket)
      : undefined,
    tcPhysicalParameter: _map(data.tcPhysicalParameter, d => (tCPhysicalParameter.decode(d))),
  }),
};
