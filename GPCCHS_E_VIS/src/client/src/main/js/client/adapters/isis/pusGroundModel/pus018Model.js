// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus018ConfiguredObcp = require('./pus018ConfiguredObcp');
const pus018Obcp = require('./pus018Obcp');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    engineStatus: (data.engineStatus !== null && typeof data.engineStatus !== 'undefined')
      ? uINTEGER.encode(data.engineStatus)
      : null,
    pus018Obcp: _map(data.pus018Obcp, d => (pus018Obcp.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    noOBCPs: (data.noOBCPs !== null && typeof data.noOBCPs !== 'undefined')
      ? uINTEGER.encode(data.noOBCPs)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    pus018ConfiguredObcp: _map(data.pus018ConfiguredObcp, d => (pus018ConfiguredObcp.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
  }),
  decode: data => ({
    engineStatus: (data.engineStatus !== null && typeof data.engineStatus !== 'undefined')
      ? uINTEGER.decode(data.engineStatus)
      : undefined,
    pus018Obcp: _map(data.pus018Obcp, d => (pus018Obcp.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    noOBCPs: (data.noOBCPs !== null && typeof data.noOBCPs !== 'undefined')
      ? uINTEGER.decode(data.noOBCPs)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    pus018ConfiguredObcp: _map(data.pus018ConfiguredObcp, d => (pus018ConfiguredObcp.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
