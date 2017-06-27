// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');

const eventDefinition = {
  name: 'myIDENTIFIER',
  pattern: [getNamedValue(), getNamedValue()],
};

module.exports = override => (override ? _defaultsDeep({}, override, eventDefinition) : eventDefinition);
