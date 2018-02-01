// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const namedValue = require('../ccsds_mal/namedValue');
const opAlertClosingData = require('./opAlertClosingData');
const opAlertConfiguration = require('./opAlertConfiguration');
const sTRING = require('../ccsds_mal/sTRING');
const status = require('./status');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    alertDate: (data.alertDate !== null && typeof data.alertDate !== 'undefined')
      ? tIME.encode(data.alertDate)
      : null,
    target: (data.target !== null && typeof data.target !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.target))
      : null,
    specificAttributes: (data.specificAttributes !== null && typeof data.specificAttributes !== 'undefined')
      ? namedValue.encode(data.specificAttributes)
      : null,
    closingNeeded: (data.closingNeeded !== null && typeof data.closingNeeded !== 'undefined')
      ? bOOLEAN.encode(data.closingNeeded)
      : null,
    callingUser: (data.callingUser !== null && typeof data.callingUser !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.callingUser))
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.encode(data.systemDate)
      : null,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? sTRING.encode(data.mission)
      : null,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.encode(data.satellite)
      : null,
    opAlertConfiguration: _map(data.opAlertConfiguration, d => (opAlertConfiguration.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? data.status
      : null,
    lastCallDate: (data.lastCallDate !== null && typeof data.lastCallDate !== 'undefined')
      ? tIME.encode(data.lastCallDate)
      : null,
    opAlertClosingData: (data.opAlertClosingData !== null && typeof data.opAlertClosingData !== 'undefined')
      ? opAlertClosingData.encode(data.opAlertClosingData)
      : null,
  }),
  decode: data => ({
    alertDate: (data.alertDate !== null && typeof data.alertDate !== 'undefined')
      ? tIME.decode(data.alertDate)
      : undefined,
    target: (data.target !== null && typeof data.target !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.target).value)
      : undefined,
    specificAttributes: (data.specificAttributes !== null && typeof data.specificAttributes !== 'undefined')
      ? namedValue.decode(data.specificAttributes)
      : undefined,
    closingNeeded: (data.closingNeeded !== null && typeof data.closingNeeded !== 'undefined')
      ? bOOLEAN.decode(data.closingNeeded)
      : undefined,
    callingUser: (data.callingUser !== null && typeof data.callingUser !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.callingUser).value)
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.decode(data.systemDate)
      : undefined,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? sTRING.decode(data.mission)
      : undefined,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.decode(data.satellite)
      : undefined,
    opAlertConfiguration: _map(data.opAlertConfiguration, d => (opAlertConfiguration.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'enum', value: data.status, symbol: status[data.status] }
      : undefined,
    lastCallDate: (data.lastCallDate !== null && typeof data.lastCallDate !== 'undefined')
      ? tIME.decode(data.lastCallDate)
      : undefined,
    opAlertClosingData: (data.opAlertClosingData !== null && typeof data.opAlertClosingData !== 'undefined')
      ? opAlertClosingData.decode(data.opAlertClosingData)
      : undefined,
    referenceTimestamp: (data.alertDate !== null && typeof data.alertDate !== 'undefined')
        ? { type: 'time', value: data.alertDate.value.toNumber() }
        : undefined,
  }),
};
