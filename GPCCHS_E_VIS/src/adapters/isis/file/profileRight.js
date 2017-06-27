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
    profile: (data.profile !== null && typeof data.profile !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.profile))
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
    profile: (data.profile !== null && typeof data.profile !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.profile).value)
      : undefined,
  }),
};
