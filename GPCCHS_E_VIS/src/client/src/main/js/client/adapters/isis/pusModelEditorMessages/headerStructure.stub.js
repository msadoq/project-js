// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusServiceApid = require('./pusServiceApid.stub');

const headerStructure = {
  messageType: 100,
  sessionId: 100,
  domainId: 100,
  pusService: 100,
  pusServiceApid: [getPusServiceApid(), getPusServiceApid()],
  messageUniqueId: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, headerStructure) : headerStructure);
