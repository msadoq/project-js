// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const flowSmallStatus = require('./flowSmallStatus');

module.exports = {
  encode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? flowSmallStatus.encode(data.status)
      : null,
  }),
  decode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? flowSmallStatus.decode(data.status)
      : undefined,
  }),
};
