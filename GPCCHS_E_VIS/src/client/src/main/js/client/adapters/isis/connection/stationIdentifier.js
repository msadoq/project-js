// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    spacecraftID: (data.spacecraftID !== null && typeof data.spacecraftID !== 'undefined')
      ? sTRING.encode(data.spacecraftID)
      : null,
    stationID: (data.stationID !== null && typeof data.stationID !== 'undefined')
      ? sTRING.encode(data.stationID)
      : null,
  }),
  decode: data => ({
    spacecraftID: (data.spacecraftID !== null && typeof data.spacecraftID !== 'undefined')
      ? sTRING.decode(data.spacecraftID)
      : undefined,
    stationID: (data.stationID !== null && typeof data.stationID !== 'undefined')
      ? sTRING.decode(data.stationID)
      : undefined,
  }),
};
