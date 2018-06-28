// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const flowInfo = require('./flowInfo');
const lONG = require('../ccsds_mal/lONG');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    flowID: (data.flowID !== null && typeof data.flowID !== 'undefined')
      ? lONG.encode(data.flowID)
      : null,
    spacecraftID: (data.spacecraftID !== null && typeof data.spacecraftID !== 'undefined')
      ? sTRING.encode(data.spacecraftID)
      : null,
    stationID: (data.stationID !== null && typeof data.stationID !== 'undefined')
      ? sTRING.encode(data.stationID)
      : null,
    flowInfo: (data.flowInfo !== null && typeof data.flowInfo !== 'undefined')
      ? flowInfo.encode(data.flowInfo)
      : null,
  }),
  decode: data => ({
    flowID: (data.flowID !== null && typeof data.flowID !== 'undefined')
      ? lONG.decode(data.flowID)
      : undefined,
    spacecraftID: (data.spacecraftID !== null && typeof data.spacecraftID !== 'undefined')
      ? sTRING.decode(data.spacecraftID)
      : undefined,
    stationID: (data.stationID !== null && typeof data.stationID !== 'undefined')
      ? sTRING.decode(data.stationID)
      : undefined,
    flowInfo: (data.flowInfo !== null && typeof data.flowInfo !== 'undefined')
      ? flowInfo.decode(data.flowInfo)
      : undefined,
  }),
};
