// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');

const docVersion = {
  externalVersion: 'mySTRING',
  internalVersion: 1000,
  properties: [getNamedValue(), getNamedValue()],
  isVirtualVersion: true,
  dirname: 'myURI',
  basename: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, docVersion) : docVersion);
