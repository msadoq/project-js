// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ack = require('./ack');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    ackRequestDate: (data.ackRequestDate !== null && typeof data.ackRequestDate !== 'undefined')
      ? tIME.encode(data.ackRequestDate)
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.encode(data.systemDate)
      : null,
    ack: (data.ack !== null && typeof data.ack !== 'undefined')
      ? ack.encode(data.ack)
      : null,
    comment: (data.comment !== null && typeof data.comment !== 'undefined')
      ? sTRING.encode(data.comment)
      : null,
  }),
  decode: data => ({
    ackRequestDate: (data.ackRequestDate !== null && typeof data.ackRequestDate !== 'undefined')
      ? tIME.decode(data.ackRequestDate)
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.decode(data.systemDate)
      : undefined,
    ack: (data.ack !== null && typeof data.ack !== 'undefined')
      ? ack.decode(data.ack)
      : undefined,
    comment: (data.comment !== null && typeof data.comment !== 'undefined')
      ? sTRING.decode(data.comment)
      : undefined,
    referenceTimestamp: (data.ackRequestDate !== null && typeof data.ackRequestDate !== 'undefined')
        ? { type: 'time', value: data.ackRequestDate.value.toNumber() }
        : undefined,
  }),
};
