// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const user = require('../ccsds_cs/user');

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
    profile: (data.profile !== null && typeof data.profile !== 'undefined')
      ? user.encode(data.profile)
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
    profile: (data.profile !== null && typeof data.profile !== 'undefined')
      ? user.decode(data.profile)
      : undefined,
  }),
};
