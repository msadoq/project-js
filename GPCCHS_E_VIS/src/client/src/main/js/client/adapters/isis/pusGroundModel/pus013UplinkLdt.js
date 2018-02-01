// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const lONG = require('../ccsds_mal/lONG');
const pus013Ldt = require('./pus013Ldt');

module.exports = {
  encode: data => ({
    ackTimerArmed: (data.ackTimerArmed !== null && typeof data.ackTimerArmed !== 'undefined')
      ? bOOLEAN.encode(data.ackTimerArmed)
      : null,
    ackTimerDeadline: (data.ackTimerDeadline !== null && typeof data.ackTimerDeadline !== 'undefined')
      ? lONG.encode(data.ackTimerDeadline)
      : null,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.encode(data.pus013Ldt)
      : null,
  }),
  decode: data => ({
    ackTimerArmed: (data.ackTimerArmed !== null && typeof data.ackTimerArmed !== 'undefined')
      ? bOOLEAN.decode(data.ackTimerArmed)
      : undefined,
    ackTimerDeadline: (data.ackTimerDeadline !== null && typeof data.ackTimerDeadline !== 'undefined')
      ? lONG.decode(data.ackTimerDeadline)
      : undefined,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.decode(data.pus013Ldt)
      : undefined,
  }),
};
