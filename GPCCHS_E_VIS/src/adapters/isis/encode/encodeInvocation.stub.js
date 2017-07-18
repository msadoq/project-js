// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getEncodingAction = require('./encodingAction.stub');

const encodeInvocation = {
  definitionId: -1000,
  inputType: 1,
  encodingAction: getEncodingAction(),
  encodedType: 2,
};

module.exports = override => (override ? _defaultsDeep({}, override, encodeInvocation) : encodeInvocation);
