// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const tIME = require('../ccsds_mal/tIME');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

module.exports = {
  encode: data => ({
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? tIME.encode(data.onboardDate)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uSHORT.encode(data.apid)
      : null,
    service: (data.service !== null && typeof data.service !== 'undefined')
      ? uOCTET.encode(data.service)
      : null,
    subService: (data.subService !== null && typeof data.subService !== 'undefined')
      ? uOCTET.encode(data.subService)
      : null,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? uOCTET.encode(data.destinationId)
      : null,
    isDecommuted: (data.isDecommuted !== null && typeof data.isDecommuted !== 'undefined')
      ? bOOLEAN.encode(data.isDecommuted)
      : null,
    primaryHeaderSize: (data.primaryHeaderSize !== null && typeof data.primaryHeaderSize !== 'undefined')
      ? uOCTET.encode(data.primaryHeaderSize)
      : null,
    secondaryHeaderSize: (data.secondaryHeaderSize !== null && typeof data.secondaryHeaderSize !== 'undefined')
      ? uOCTET.encode(data.secondaryHeaderSize)
      : null,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? bOOLEAN.encode(data.isNominal)
      : null,
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? bLOB.encode(data.rawData)
      : null,
  }),
  decode: data => ({
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? tIME.decode(data.onboardDate)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uSHORT.decode(data.apid)
      : undefined,
    service: (data.service !== null && typeof data.service !== 'undefined')
      ? uOCTET.decode(data.service)
      : undefined,
    subService: (data.subService !== null && typeof data.subService !== 'undefined')
      ? uOCTET.decode(data.subService)
      : undefined,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? uOCTET.decode(data.destinationId)
      : undefined,
    isDecommuted: (data.isDecommuted !== null && typeof data.isDecommuted !== 'undefined')
      ? bOOLEAN.decode(data.isDecommuted)
      : undefined,
    primaryHeaderSize: (data.primaryHeaderSize !== null && typeof data.primaryHeaderSize !== 'undefined')
      ? uOCTET.decode(data.primaryHeaderSize)
      : undefined,
    secondaryHeaderSize: (data.secondaryHeaderSize !== null && typeof data.secondaryHeaderSize !== 'undefined')
      ? uOCTET.decode(data.secondaryHeaderSize)
      : undefined,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? bOOLEAN.decode(data.isNominal)
      : undefined,
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? bLOB.decode(data.rawData)
      : undefined,
  }),
};
