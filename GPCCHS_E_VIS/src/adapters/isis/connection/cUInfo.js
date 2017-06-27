// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    isSLE: (data.isSLE !== null && typeof data.isSLE !== 'undefined')
      ? bOOLEAN.encode(data.isSLE)
      : null,
    reconnectionNumber: (data.reconnectionNumber !== null && typeof data.reconnectionNumber !== 'undefined')
      ? iNTEGER.encode(data.reconnectionNumber)
      : null,
    reconnectionDelay: (data.reconnectionDelay !== null && typeof data.reconnectionDelay !== 'undefined')
      ? iNTEGER.encode(data.reconnectionDelay)
      : null,
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    sicFile: (data.sicFile !== null && typeof data.sicFile !== 'undefined')
      ? sTRING.encode(data.sicFile)
      : null,
  }),
  decode: data => ({
    isSLE: (data.isSLE !== null && typeof data.isSLE !== 'undefined')
      ? bOOLEAN.decode(data.isSLE)
      : undefined,
    reconnectionNumber: (data.reconnectionNumber !== null && typeof data.reconnectionNumber !== 'undefined')
      ? iNTEGER.decode(data.reconnectionNumber)
      : undefined,
    reconnectionDelay: (data.reconnectionDelay !== null && typeof data.reconnectionDelay !== 'undefined')
      ? iNTEGER.decode(data.reconnectionDelay)
      : undefined,
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    sicFile: (data.sicFile !== null && typeof data.sicFile !== 'undefined')
      ? sTRING.decode(data.sicFile)
      : undefined,
  }),
};
