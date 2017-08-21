// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const tCDetailType = require('./tCDetailType');
const tCDetails = require('./tCDetails');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    tcDetailType: (data.tcDetailType !== null && typeof data.tcDetailType !== 'undefined')
      ? data.tcDetailType
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.encode(data.value)
      : null,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? bOOLEAN.encode(data.valueIsRaw)
      : null,
    apId: (data.apId !== null && typeof data.apId !== 'undefined')
      ? uINTEGER.encode(data.apId)
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.encode(data.sourceId)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.encode(data.sequenceCount)
      : null,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? uINTEGER.encode(data.serviceType)
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.encode(data.serviceSubType)
      : null,
    argumentIds: _map(data.argumentIds, d => (iDENTIFIER.encode(d))),
    argumentValues: _map(data.argumentValues, d => (tCDetails.encode(d))),
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.encode(data.rawPacket)
      : null,
  }),
  decode: data => ({
    tcDetailType: (data.tcDetailType !== null && typeof data.tcDetailType !== 'undefined')
      ? { type: 'enum', value: data.tcDetailType, symbol: tCDetailType[data.tcDetailType] }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.decode(data.value)
      : undefined,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? bOOLEAN.decode(data.valueIsRaw)
      : undefined,
    apId: (data.apId !== null && typeof data.apId !== 'undefined')
      ? uINTEGER.decode(data.apId)
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.decode(data.sourceId)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.decode(data.sequenceCount)
      : undefined,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? uINTEGER.decode(data.serviceType)
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? uINTEGER.decode(data.serviceSubType)
      : undefined,
    argumentIds: _map(data.argumentIds, d => (iDENTIFIER.decode(d))),
    argumentValues: _map(data.argumentValues, d => (tCDetails.decode(d))),
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? bLOB.decode(data.rawPacket)
      : undefined,
  }),
};
