const _map = require('lodash/map');

const ADEGenericPayload = require('./ADEGenericPayload');

module.exports = {
  encode: data => ({
    genericPayload: _map(data.genericPayload, p => ADEGenericPayload.encode(p)),
  }),
  decode: (data) => ({ genericPayload: _map(data.genericPayload, p => ADEGenericPayload.decode(p)) }),
};