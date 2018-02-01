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
const lONG = require('../ccsds_mal/lONG');
const tIME = require('../ccsds_mal/tIME');
const transition = require('./transition');

module.exports = {
  encode: data => ({
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.encode(data.creationDate)
      : null,
    paramUid: (data.paramUid !== null && typeof data.paramUid !== 'undefined')
      ? lONG.encode(data.paramUid)
      : null,
    updateDate: (data.updateDate !== null && typeof data.updateDate !== 'undefined')
      ? tIME.encode(data.updateDate)
      : null,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? tIME.encode(data.closingDate)
      : null,
    hasAckRequest: (data.hasAckRequest !== null && typeof data.hasAckRequest !== 'undefined')
      ? bOOLEAN.encode(data.hasAckRequest)
      : null,
    alarmId: (data.alarmId !== null && typeof data.alarmId !== 'undefined')
      ? lONG.encode(data.alarmId)
      : null,
    transitions: _map(data.transitions, d => (transition.encode(d))),
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? bOOLEAN.encode(data.isNominal)
      : null,
  }),
  decode: data => ({
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.decode(data.creationDate)
      : undefined,
    paramUid: (data.paramUid !== null && typeof data.paramUid !== 'undefined')
      ? lONG.decode(data.paramUid)
      : undefined,
    updateDate: (data.updateDate !== null && typeof data.updateDate !== 'undefined')
      ? tIME.decode(data.updateDate)
      : undefined,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? tIME.decode(data.closingDate)
      : undefined,
    hasAckRequest: (data.hasAckRequest !== null && typeof data.hasAckRequest !== 'undefined')
      ? bOOLEAN.decode(data.hasAckRequest)
      : undefined,
    alarmId: (data.alarmId !== null && typeof data.alarmId !== 'undefined')
      ? lONG.decode(data.alarmId)
      : undefined,
    transitions: _map(data.transitions, d => (transition.decode(d))),
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? bOOLEAN.decode(data.isNominal)
      : undefined,
    referenceTimestamp: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
        ? { type: 'time', value: data.creationDate.value.toNumber() }
        : undefined,
  }),
};
