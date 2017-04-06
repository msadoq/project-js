// Produced by Acceleo JavaScript Generator 1.1.0
const protobuf = require('../../../');

module.exports = {
  encode: data => ({
    read: (data.read !== null && typeof data.read !== 'undefined')
      ? { value: data.read }
      : null,
    changeAccessRight: (data.changeAccessRight !== null && typeof data.changeAccessRight !== 'undefined')
      ? { value: data.changeAccessRight }
      : null,
    write: (data.write !== null && typeof data.write !== 'undefined')
      ? { value: data.write }
      : null,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? { value: protobuf.encode('lpisis.ccsds_cs.User', data.user) }
      : null,
  }),
  decode: data => ({
    read: (data.read !== null && typeof data.read !== 'undefined')
      ? { type: 'boolean', value: data.read.value }
      : undefined,
    changeAccessRight: (data.changeAccessRight !== null && typeof data.changeAccessRight !== 'undefined')
      ? { type: 'boolean', value: data.changeAccessRight.value }
      : undefined,
    write: (data.write !== null && typeof data.write !== 'undefined')
      ? { type: 'boolean', value: data.write.value }
      : undefined,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.User', data.user.value)
      : undefined,
  }),
};

