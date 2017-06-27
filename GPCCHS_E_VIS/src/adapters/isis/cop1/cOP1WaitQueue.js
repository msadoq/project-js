// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const fLOAT = require('../ccsds_mal/fLOAT');
const iNTEGER = require('../ccsds_mal/iNTEGER');

module.exports = {
  encode: data => ({
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? iNTEGER.encode(data.internal_id)
      : null,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? bLOB.encode(data.frame_data)
      : null,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? fLOAT.encode(data.reemission_delay)
      : null,
  }),
  decode: data => ({
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? iNTEGER.decode(data.internal_id)
      : undefined,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? bLOB.decode(data.frame_data)
      : undefined,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? fLOAT.decode(data.reemission_delay)
      : undefined,
  }),
};
