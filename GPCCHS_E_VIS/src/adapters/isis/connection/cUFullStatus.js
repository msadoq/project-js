// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const cUIdentifier = require('./cUIdentifier');
const cUStatus = require('./cUStatus');

module.exports = {
  encode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? cUIdentifier.encode(data.identifier)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? cUStatus.encode(data.status)
      : null,
  }),
  decode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? cUIdentifier.decode(data.identifier)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? cUStatus.decode(data.status)
      : undefined,
  }),
};
