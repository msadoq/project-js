// Produced by Acceleo JavaScript Generator 1.1.0
const protobuf = require('../../../');

module.exports = {
  encode: data => ({
    ackDate: (data.ackDate !== null && typeof data.ackDate !== 'undefined')
      ? { value: data.ackDate }
      : null,
    acknowledger: (data.acknowledger !== null && typeof data.acknowledger !== 'undefined')
      ? { value: protobuf.encode('lpisis.ccsds_cs.User', data.acknowledger) }
      : null,
  }),
  decode: data => ({
    ackDate: (data.ackDate !== null && typeof data.ackDate !== 'undefined')
      ? { type: 'time', value: data.ackDate.value.toNumber() }
      : undefined,
    acknowledger: (data.acknowledger !== null && typeof data.acknowledger !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.User', data.acknowledger.value)
      : undefined,
  }),
};

