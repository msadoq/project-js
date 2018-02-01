// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const dURATION = require('../ccsds_mal/dURATION');
const generationMode = require('./generationMode');
const packetType = require('./packetType');
const parameter = require('./parameter');
const tIME = require('../ccsds_mal/tIME');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

module.exports = {
  encode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? data.generationMode
      : null,
    filtered: (data.filtered !== null && typeof data.filtered !== 'undefined')
      ? bOOLEAN.encode(data.filtered)
      : null,
    deltaTime: (data.deltaTime !== null && typeof data.deltaTime !== 'undefined')
      ? dURATION.encode(data.deltaTime)
      : null,
    intervalTime: (data.intervalTime !== null && typeof data.intervalTime !== 'undefined')
      ? dURATION.encode(data.intervalTime)
      : null,
    setIntervalTime: (data.setIntervalTime !== null && typeof data.setIntervalTime !== 'undefined')
      ? dURATION.encode(data.setIntervalTime)
      : null,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? tIME.encode(data.onboardDate)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? data.packetType
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
    values: _map(data.values, d => (parameter.encode(d))),
  }),
  decode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? { type: 'enum', value: data.generationMode, symbol: generationMode[data.generationMode] }
      : undefined,
    filtered: (data.filtered !== null && typeof data.filtered !== 'undefined')
      ? bOOLEAN.decode(data.filtered)
      : undefined,
    deltaTime: (data.deltaTime !== null && typeof data.deltaTime !== 'undefined')
      ? dURATION.decode(data.deltaTime)
      : undefined,
    intervalTime: (data.intervalTime !== null && typeof data.intervalTime !== 'undefined')
      ? dURATION.decode(data.intervalTime)
      : undefined,
    setIntervalTime: (data.setIntervalTime !== null && typeof data.setIntervalTime !== 'undefined')
      ? dURATION.decode(data.setIntervalTime)
      : undefined,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? tIME.decode(data.onboardDate)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? { type: 'enum', value: data.packetType, symbol: packetType[data.packetType] }
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
    values: _map(data.values, d => (parameter.decode(d))),
    referenceTimestamp: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
        ? { type: 'time', value: data.onboardDate.value.toNumber() }
        : undefined,
  }),
};
