// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    read: (data.read !== null && typeof data.read !== 'undefined')
      ? bOOLEAN.encode(data.read)
      : null,
    changeAccessRight: (data.changeAccessRight !== null && typeof data.changeAccessRight !== 'undefined')
      ? bOOLEAN.encode(data.changeAccessRight)
      : null,
    write: (data.write !== null && typeof data.write !== 'undefined')
      ? bOOLEAN.encode(data.write)
      : null,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.user))
      : null,
  }),
  decode: data => ({
    read: (data.read !== null && typeof data.read !== 'undefined')
      ? bOOLEAN.decode(data.read)
      : undefined,
    changeAccessRight: (data.changeAccessRight !== null && typeof data.changeAccessRight !== 'undefined')
      ? bOOLEAN.decode(data.changeAccessRight)
      : undefined,
    write: (data.write !== null && typeof data.write !== 'undefined')
      ? bOOLEAN.decode(data.write)
      : undefined,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.user).value)
      : undefined,
  }),
};
