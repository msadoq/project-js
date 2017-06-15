// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const opAlertClosingData = require('./opAlertClosingData');
const opAlertConfiguration = require('./opAlertConfiguration');
const status = require('./status');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    alertDate: (data.alertDate !== null && typeof data.alertDate !== 'undefined')
      ? { value: data.alertDate }
      : null,
    target: (data.target !== null && typeof data.target !== 'undefined')
      ? user.encode(data.target)
      : null,
    specificAttributes: (data.specificAttributes !== null && typeof data.specificAttributes !== 'undefined')
      ? namedValue.encode(data.specificAttributes)
      : null,
    closingNeeded: (data.closingNeeded !== null && typeof data.closingNeeded !== 'undefined')
      ? { value: data.closingNeeded }
      : null,
    callingUser: (data.callingUser !== null && typeof data.callingUser !== 'undefined')
      ? user.encode(data.callingUser)
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { value: data.systemDate }
      : null,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { value: data.mission }
      : null,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { value: data.satellite }
      : null,
    opAlertConfiguration: _map(data.opAlertConfiguration, d => (opAlertConfiguration.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? data.status
      : null,
    lastCallDate: (data.lastCallDate !== null && typeof data.lastCallDate !== 'undefined')
      ? { value: data.lastCallDate }
      : null,
    opAlertClosingData: (data.opAlertClosingData !== null && typeof data.opAlertClosingData !== 'undefined')
      ? opAlertClosingData.encode(data.opAlertClosingData)
      : null,
  }),
  decode: data => ({
    alertDate: (data.alertDate !== null && typeof data.alertDate !== 'undefined')
      ? { type: 'time', value: data.alertDate.value.toNumber() }
      : undefined,
    target: (data.target !== null && typeof data.target !== 'undefined')
      ? user.decode(data.target)
      : undefined,
    specificAttributes: (data.specificAttributes !== null && typeof data.specificAttributes !== 'undefined')
      ? namedValue.decode(data.specificAttributes)
      : undefined,
    closingNeeded: (data.closingNeeded !== null && typeof data.closingNeeded !== 'undefined')
      ? { type: 'boolean', value: data.closingNeeded.value }
      : undefined,
    callingUser: (data.callingUser !== null && typeof data.callingUser !== 'undefined')
      ? user.decode(data.callingUser)
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { type: 'time', value: data.systemDate.value.toNumber() }
      : undefined,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { type: 'string', value: data.mission.value }
      : undefined,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { type: 'ulong', symbol: data.satellite.value.toString() }
      : undefined,
    opAlertConfiguration: _map(data.opAlertConfiguration, d => (opAlertConfiguration.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'enum', value: data.status, symbol: status[data.status] }
      : undefined,
    lastCallDate: (data.lastCallDate !== null && typeof data.lastCallDate !== 'undefined')
      ? { type: 'time', value: data.lastCallDate.value.toNumber() }
      : undefined,
    opAlertClosingData: (data.opAlertClosingData !== null && typeof data.opAlertClosingData !== 'undefined')
      ? opAlertClosingData.decode(data.opAlertClosingData)
      : undefined,
    referenceTimestamp: (data.alertDate !== null && typeof data.alertDate !== 'undefined')
        ? { type: 'time', value: data.alertDate.value.toNumber() }
        : undefined,
  }),
};
