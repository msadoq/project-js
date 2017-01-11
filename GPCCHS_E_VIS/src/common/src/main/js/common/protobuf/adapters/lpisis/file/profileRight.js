const protobuf = require('../../../');

module.exports = {
  encode: data => ({
    read: { value: data.read },
    changeAccessRight: { value: data.changeAccessRight },
    write: { value: data.write },
    profile: { value: protobuf.encode('lpisis.ccsds_cs.User', data.profile) },
  }),
  decode: data => ({
    read: { type: 'boolean', value: data.read.value },
    changeAccessRight: { type: 'boolean', value: data.changeAccessRight.value },
    write: { type: 'boolean', value: data.write.value },
    profile: protobuf.decode('lpisis.ccsds_cs.User', data.profile.value),
  }),
};
