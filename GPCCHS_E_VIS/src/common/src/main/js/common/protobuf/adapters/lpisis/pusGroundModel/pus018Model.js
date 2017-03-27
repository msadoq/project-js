// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus018ConfiguredObcp = require('./pus018ConfiguredObcp');
const pus018Obcp = require('./pus018Obcp');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    engineStatus: (data.engineStatus !== null && typeof data.engineStatus !== 'undefined')
      ? { value: data.engineStatus }
      : null,
    pus018Obcp: _map(data.pus018Obcp, d => (pus018Obcp.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    noOBCPs: (data.noOBCPs !== null && typeof data.noOBCPs !== 'undefined')
      ? { value: data.noOBCPs }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    pus018ConfiguredObcp: _map(data.pus018ConfiguredObcp, d => (pus018ConfiguredObcp.encode(d))),
  }),
  decode: data => ({
    engineStatus: (data.engineStatus !== null && typeof data.engineStatus !== 'undefined')
      ? { type: 'uinteger', value: data.engineStatus.value }
      : undefined,
    pus018Obcp: _map(data.pus018Obcp, d => (pus018Obcp.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    noOBCPs: (data.noOBCPs !== null && typeof data.noOBCPs !== 'undefined')
      ? { type: 'uinteger', value: data.noOBCPs.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    pus018ConfiguredObcp: _map(data.pus018ConfiguredObcp, d => (pus018ConfiguredObcp.decode(d))),
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

