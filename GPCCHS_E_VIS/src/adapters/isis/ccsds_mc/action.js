// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const attributeValue = require('./attributeValue');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const lONG = require('../ccsds_mal/lONG');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    stageStartedRequired: (data.stageStartedRequired !== null && typeof data.stageStartedRequired !== 'undefined')
      ? bOOLEAN.encode(data.stageStartedRequired)
      : null,
    stageProgressRequired: (data.stageProgressRequired !== null && typeof data.stageProgressRequired !== 'undefined')
      ? bOOLEAN.encode(data.stageProgressRequired)
      : null,
    stageCompletedRequired: (data.stageCompletedRequired !== null && typeof data.stageCompletedRequired !== 'undefined')
      ? bOOLEAN.encode(data.stageCompletedRequired)
      : null,
    argumentValues: _map(data.argumentValues, d => (attributeValue.encode(d))),
    argumentIds: _map(data.argumentIds, d => (lONG.encode(d))),
    isConvertedValues: _map(data.isConvertedValues, d => (bOOLEAN.encode(d))),
    delay: (data.delay !== null && typeof data.delay !== 'undefined')
      ? uINTEGER.encode(data.delay)
      : null,
    tCID: (data.tCID !== null && typeof data.tCID !== 'undefined')
      ? lONG.encode(data.tCID)
      : null,
  }),
  decode: data => ({
    stageStartedRequired: (data.stageStartedRequired !== null && typeof data.stageStartedRequired !== 'undefined')
      ? bOOLEAN.decode(data.stageStartedRequired)
      : undefined,
    stageProgressRequired: (data.stageProgressRequired !== null && typeof data.stageProgressRequired !== 'undefined')
      ? bOOLEAN.decode(data.stageProgressRequired)
      : undefined,
    stageCompletedRequired: (data.stageCompletedRequired !== null && typeof data.stageCompletedRequired !== 'undefined')
      ? bOOLEAN.decode(data.stageCompletedRequired)
      : undefined,
    argumentValues: _map(data.argumentValues, d => (attributeValue.decode(d))),
    argumentIds: _map(data.argumentIds, d => (lONG.decode(d))),
    isConvertedValues: _map(data.isConvertedValues, d => (bOOLEAN.decode(d))),
    delay: (data.delay !== null && typeof data.delay !== 'undefined')
      ? uINTEGER.decode(data.delay)
      : undefined,
    tCID: (data.tCID !== null && typeof data.tCID !== 'undefined')
      ? lONG.decode(data.tCID)
      : undefined,
  }),
};
