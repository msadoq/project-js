// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    ackDate: (data.ackDate !== null && typeof data.ackDate !== 'undefined')
      ? { value: data.ackDate }
      : null,
    acknowledger: (data.acknowledger !== null && typeof data.acknowledger !== 'undefined')
      ? user.encode(data.acknowledger)
      : null,
  }),
  decode: data => ({
    ackDate: (data.ackDate !== null && typeof data.ackDate !== 'undefined')
      ? { type: 'time', value: data.ackDate.value.toNumber() }
      : undefined,
    acknowledger: (data.acknowledger !== null && typeof data.acknowledger !== 'undefined')
      ? user.decode(data.acknowledger)
      : undefined,
  }),
};
