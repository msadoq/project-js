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
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    receptionTimerArmed: (data.receptionTimerArmed !== null && typeof data.receptionTimerArmed !== 'undefined')
      ? bOOLEAN.encode(data.receptionTimerArmed)
      : null,
    receptionTimerDeadline: (data.receptionTimerDeadline !== null && typeof data.receptionTimerDeadline !== 'undefined')
      ? tIME.encode(data.receptionTimerDeadline)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? lONG.encode(data.groundDate)
      : null,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.encode(data.pus013Ldt)
      : null,
  }),
  decode: data => ({
    receptionTimerArmed: (data.receptionTimerArmed !== null && typeof data.receptionTimerArmed !== 'undefined')
      ? bOOLEAN.decode(data.receptionTimerArmed)
      : undefined,
    receptionTimerDeadline: (data.receptionTimerDeadline !== null && typeof data.receptionTimerDeadline !== 'undefined')
      ? tIME.decode(data.receptionTimerDeadline)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? lONG.decode(data.groundDate)
      : undefined,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.decode(data.pus013Ldt)
      : undefined,
  }),
};
