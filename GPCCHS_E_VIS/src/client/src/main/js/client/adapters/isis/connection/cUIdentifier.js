// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const cUInfo = require('./cUInfo');
const lONG = require('../ccsds_mal/lONG');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    cUID: (data.cUID !== null && typeof data.cUID !== 'undefined')
      ? lONG.encode(data.cUID)
      : null,
    channelName: (data.channelName !== null && typeof data.channelName !== 'undefined')
      ? sTRING.encode(data.channelName)
      : null,
    spacecraftID: (data.spacecraftID !== null && typeof data.spacecraftID !== 'undefined')
      ? sTRING.encode(data.spacecraftID)
      : null,
    stationID: (data.stationID !== null && typeof data.stationID !== 'undefined')
      ? sTRING.encode(data.stationID)
      : null,
    flowID: (data.flowID !== null && typeof data.flowID !== 'undefined')
      ? lONG.encode(data.flowID)
      : null,
    cUInfo: (data.cUInfo !== null && typeof data.cUInfo !== 'undefined')
      ? cUInfo.encode(data.cUInfo)
      : null,
  }),
  decode: data => ({
    cUID: (data.cUID !== null && typeof data.cUID !== 'undefined')
      ? lONG.decode(data.cUID)
      : undefined,
    channelName: (data.channelName !== null && typeof data.channelName !== 'undefined')
      ? sTRING.decode(data.channelName)
      : undefined,
    spacecraftID: (data.spacecraftID !== null && typeof data.spacecraftID !== 'undefined')
      ? sTRING.decode(data.spacecraftID)
      : undefined,
    stationID: (data.stationID !== null && typeof data.stationID !== 'undefined')
      ? sTRING.decode(data.stationID)
      : undefined,
    flowID: (data.flowID !== null && typeof data.flowID !== 'undefined')
      ? lONG.decode(data.flowID)
      : undefined,
    cUInfo: (data.cUInfo !== null && typeof data.cUInfo !== 'undefined')
      ? cUInfo.decode(data.cUInfo)
      : undefined,
  }),
};
