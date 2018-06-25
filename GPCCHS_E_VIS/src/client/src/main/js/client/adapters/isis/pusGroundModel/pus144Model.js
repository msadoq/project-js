// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus144OnboardFiles = require('./pus144OnboardFiles');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    pus144OnboardFiles: _map(data.pus144OnboardFiles, d => (pus144OnboardFiles.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    noOfOnBoardFiles: (data.noOfOnBoardFiles !== null && typeof data.noOfOnBoardFiles !== 'undefined')
      ? uINTEGER.encode(data.noOfOnBoardFiles)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
  }),
  decode: data => ({
    pus144OnboardFiles: _map(data.pus144OnboardFiles, d => (pus144OnboardFiles.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    noOfOnBoardFiles: (data.noOfOnBoardFiles !== null && typeof data.noOfOnBoardFiles !== 'undefined')
      ? uINTEGER.decode(data.noOfOnBoardFiles)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
