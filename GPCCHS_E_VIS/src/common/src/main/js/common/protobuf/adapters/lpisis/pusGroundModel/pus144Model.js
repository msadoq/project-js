// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus144OnboardFiles = require('./pus144OnboardFiles');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    pus144OnboardFiles: _map(data.pus144OnboardFiles, d => (pus144OnboardFiles.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    noOfOnBoardFiles: (data.noOfOnBoardFiles !== null && typeof data.noOfOnBoardFiles !== 'undefined')
      ? { value: data.noOfOnBoardFiles }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    pus144OnboardFiles: _map(data.pus144OnboardFiles, d => (pus144OnboardFiles.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    noOfOnBoardFiles: (data.noOfOnBoardFiles !== null && typeof data.noOfOnBoardFiles !== 'undefined')
      ? { type: 'uinteger', value: data.noOfOnBoardFiles.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

