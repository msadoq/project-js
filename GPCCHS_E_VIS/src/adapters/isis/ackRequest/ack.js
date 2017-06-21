// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const tIME = require('../ccsds_mal/tIME');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    ackDate: (data.ackDate !== null && typeof data.ackDate !== 'undefined')
      ? tIME.encode(data.ackDate)
      : null,
    acknowledger: (data.acknowledger !== null && typeof data.acknowledger !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.acknowledger))
      : null,
  }),
  decode: data => ({
    ackDate: (data.ackDate !== null && typeof data.ackDate !== 'undefined')
      ? tIME.decode(data.ackDate)
      : undefined,
    acknowledger: (data.acknowledger !== null && typeof data.acknowledger !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.acknowledger).value)
      : undefined,
  }),
};
