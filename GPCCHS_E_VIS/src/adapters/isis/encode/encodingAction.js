// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const attributeValue = require('../ccsds_mc/attributeValue');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    argumentValues: _map(data.argumentValues, d => (attributeValue.encode(d))),
    argumentDefinitions: _map(data.argumentDefinitions, d => (iDENTIFIER.encode(d))),
    isConvertedValues: _map(data.isConvertedValues, d => (bOOLEAN.encode(d))),
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.encode(data.sourceId)
      : null,
    isForSending: (data.isForSending !== null && typeof data.isForSending !== 'undefined')
      ? bOOLEAN.encode(data.isForSending)
      : null,
    countOverwriteFlag: (data.countOverwriteFlag !== null && typeof data.countOverwriteFlag !== 'undefined')
      ? bOOLEAN.encode(data.countOverwriteFlag)
      : null,
    preencryptedFlag: (data.preencryptedFlag !== null && typeof data.preencryptedFlag !== 'undefined')
      ? bOOLEAN.encode(data.preencryptedFlag)
      : null,
    ackField: (data.ackField !== null && typeof data.ackField !== 'undefined')
      ? uINTEGER.encode(data.ackField)
      : null,
  }),
  decode: data => ({
    argumentValues: _map(data.argumentValues, d => (attributeValue.decode(d))),
    argumentDefinitions: _map(data.argumentDefinitions, d => (iDENTIFIER.decode(d))),
    isConvertedValues: _map(data.isConvertedValues, d => (bOOLEAN.decode(d))),
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uINTEGER.decode(data.sourceId)
      : undefined,
    isForSending: (data.isForSending !== null && typeof data.isForSending !== 'undefined')
      ? bOOLEAN.decode(data.isForSending)
      : undefined,
    countOverwriteFlag: (data.countOverwriteFlag !== null && typeof data.countOverwriteFlag !== 'undefined')
      ? bOOLEAN.decode(data.countOverwriteFlag)
      : undefined,
    preencryptedFlag: (data.preencryptedFlag !== null && typeof data.preencryptedFlag !== 'undefined')
      ? bOOLEAN.decode(data.preencryptedFlag)
      : undefined,
    ackField: (data.ackField !== null && typeof data.ackField !== 'undefined')
      ? uINTEGER.decode(data.ackField)
      : undefined,
  }),
};
