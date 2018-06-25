// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uSHORT = require('../ccsds_mal/uSHORT');

module.exports = {
  encode: data => ({
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uSHORT.encode(data.sourceId)
      : null,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.encode(data.commandApid)
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.encode(data.sequenceCount)
      : null,
  }),
  decode: data => ({
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? uSHORT.decode(data.sourceId)
      : undefined,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.decode(data.commandApid)
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? uINTEGER.decode(data.sequenceCount)
      : undefined,
  }),
};
