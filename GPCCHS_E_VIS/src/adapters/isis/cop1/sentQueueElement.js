// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const fLOAT = require('../ccsds_mal/fLOAT');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? uOCTET.encode(data.retransmit_flag)
      : null,
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? uINTEGER.encode(data.internal_id)
      : null,
    num_farm: (data.num_farm !== null && typeof data.num_farm !== 'undefined')
      ? uINTEGER.encode(data.num_farm)
      : null,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? sTRING.encode(data.date)
      : null,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? bLOB.encode(data.frame_data)
      : null,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? fLOAT.encode(data.reemission_delay)
      : null,
  }),
  decode: data => ({
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? uOCTET.decode(data.retransmit_flag)
      : undefined,
    internal_id: (data.internal_id !== null && typeof data.internal_id !== 'undefined')
      ? uINTEGER.decode(data.internal_id)
      : undefined,
    num_farm: (data.num_farm !== null && typeof data.num_farm !== 'undefined')
      ? uINTEGER.decode(data.num_farm)
      : undefined,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? sTRING.decode(data.date)
      : undefined,
    frame_data: (data.frame_data !== null && typeof data.frame_data !== 'undefined')
      ? bLOB.decode(data.frame_data)
      : undefined,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? fLOAT.decode(data.reemission_delay)
      : undefined,
  }),
};
