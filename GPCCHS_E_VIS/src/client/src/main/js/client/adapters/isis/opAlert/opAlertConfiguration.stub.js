// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const opAlertConfiguration = {
  maxNumberRetriesPhone: -100,
  delayRetriesPhone: 42.5,
  maxNumberRetriesAudio: 'myIDENTIFIER',
  delayRetriesAudio: 42.5,
  maxNumberRetriesEmail: -100,
  delayRetriesEmail: 42.5,
  maxNumberRetriesSms: -100,
  delayRetriesSms: 42.5,
};

module.exports = override => (override ? _defaultsDeep({}, override, opAlertConfiguration) : opAlertConfiguration);
