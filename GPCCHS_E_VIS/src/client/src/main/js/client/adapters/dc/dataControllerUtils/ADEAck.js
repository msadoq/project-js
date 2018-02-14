const _map = require('lodash/map');

const ADEGenericPayload = require('./ADEGenericPayload');

module.exports = {
  encode: data => ({
    sessionId: data.sessionId,
    domainId: data.domainId,
    genericPayload: _map(data.genericPayload, p => ADEGenericPayload.encode(p)),
  }),
  decode: data => ({
    sessionId: data.sessionId,
    domainId: data.domainId,
    genericPayload: _map(data.genericPayload, p => ADEGenericPayload.decode(p))
  }),
};