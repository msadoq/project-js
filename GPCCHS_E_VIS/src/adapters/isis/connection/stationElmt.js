// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const flowConfiguration = require('./flowConfiguration');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    stationId: (data.stationId !== null && typeof data.stationId !== 'undefined')
      ? sTRING.encode(data.stationId)
      : null,
    configuration: (data.configuration !== null && typeof data.configuration !== 'undefined')
      ? flowConfiguration.encode(data.configuration)
      : null,
  }),
  decode: data => ({
    stationId: (data.stationId !== null && typeof data.stationId !== 'undefined')
      ? sTRING.decode(data.stationId)
      : undefined,
    configuration: (data.configuration !== null && typeof data.configuration !== 'undefined')
      ? flowConfiguration.decode(data.configuration)
      : undefined,
  }),
};
