const uINTEGER = require('../ccsds_mal/uINTEGER');
const pusServiceApid = require('./pusServiceApid');
const _map = require('lodash/map');


module.exports = {
  encode: data => ({
    sessionId: (data.sessionId !== null && typeof data.sessionId !== 'undefined')
      ? uINTEGER.encode(data.sessionId)
      : null,
    domainId: (data.domainId !== null && typeof data.domainId !== 'undefined')
      ? uINTEGER.encode(data.domainId)
      : null,
    pusService: (data.pusService !== null && typeof data.pusService !== 'undefined')
      ? uINTEGER.encode(data.pusService)
      : null,
    pusServiceApid: _map(data.pusServiceApid, pusSA => pusServiceApid.encode(pusSA)),
  }),
  decode: data => ({
    sessionId: (data.sessionId !== null && typeof data.sessionId !== 'undefined')
      ? uINTEGER.decode(data.sessionId)
      : undefined,
    domainId: (data.domainId !== null && typeof data.domainId !== 'undefined')
      ? uINTEGER.decode(data.domainId)
      : undefined,
    pusService: (data.pusService !== null && typeof data.pusService !== 'undefined')
      ? uINTEGER.decode(data.pusService)
      : undefined,
    pusServiceApid: _map(data.pusServiceApid, pusSA => pusServiceApid.decode(pusSA)),
  }),
};
