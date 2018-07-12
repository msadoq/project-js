const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');
const pus018Obcp = require('./pus018Obcp');
const _map = require('lodash/map');


module.exports = {
  encode: data => ({
    engineStatus: (data.engineStatus !== null && typeof data.engineStatus !== 'undefined')
      ? uINTEGER.encode(data.engineStatus)
      : null,
    pus018Obcp: _map(data.pus018Obcp, obcp => pus018Obcp.encode(obcp)),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    lastUpdateModeEngineStatus: (data.lastUpdateModeEngineStatus !== null && typeof data.lastUpdateModeEngineStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeEngineStatus)
      : null,
    lastUpdateTimeEngineStatus: (data.lastUpdateTimeEngineStatus !== null && typeof data.lastUpdateTimeEngineStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeEngineStatus)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    engineStatus: (data.engineStatus !== null && typeof data.engineStatus !== 'undefined')
      ? uINTEGER.decode(data.engineStatus)
      : undefined,
    pus018Obcp: _map(data.pus018Obcp, obcp => pus018Obcp.decode(obcp)),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    lastUpdateModeEngineStatus: (data.lastUpdateModeEngineStatus !== null && typeof data.lastUpdateModeEngineStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeEngineStatus)
      : undefined,
    lastUpdateTimeEngineStatus: (data.lastUpdateTimeEngineStatus !== null && typeof data.lastUpdateTimeEngineStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeEngineStatus)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
