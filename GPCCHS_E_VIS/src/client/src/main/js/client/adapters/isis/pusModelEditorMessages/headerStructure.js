// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pusServiceApid = require('./pusServiceApid');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    messageType: (data.messageType !== null && typeof data.messageType !== 'undefined')
      ? uINTEGER.encode(data.messageType)
      : null,
    sessionId: (data.sessionId !== null && typeof data.sessionId !== 'undefined')
      ? uINTEGER.encode(data.sessionId)
      : null,
    domainId: (data.domainId !== null && typeof data.domainId !== 'undefined')
      ? uINTEGER.encode(data.domainId)
      : null,
    pusService: (data.pusService !== null && typeof data.pusService !== 'undefined')
      ? uINTEGER.encode(data.pusService)
      : null,
    pusServiceApid: _map(data.pusServiceApid, d => (pusServiceApid.encode(d))),
    messageUniqueId: (data.messageUniqueId !== null && typeof data.messageUniqueId !== 'undefined')
      ? uINTEGER.encode(data.messageUniqueId)
      : null,
  }),
  decode: data => ({
    messageType: (data.messageType !== null && typeof data.messageType !== 'undefined')
      ? uINTEGER.decode(data.messageType)
      : undefined,
    sessionId: (data.sessionId !== null && typeof data.sessionId !== 'undefined')
      ? uINTEGER.decode(data.sessionId)
      : undefined,
    domainId: (data.domainId !== null && typeof data.domainId !== 'undefined')
      ? uINTEGER.decode(data.domainId)
      : undefined,
    pusService: (data.pusService !== null && typeof data.pusService !== 'undefined')
      ? uINTEGER.decode(data.pusService)
      : undefined,
    pusServiceApid: _map(data.pusServiceApid, d => (pusServiceApid.decode(d))),
    messageUniqueId: (data.messageUniqueId !== null && typeof data.messageUniqueId !== 'undefined')
      ? uINTEGER.decode(data.messageUniqueId)
      : undefined,
  }),
};
