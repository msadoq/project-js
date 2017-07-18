// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getAttributeValue = require('../ccsds_mc/attributeValue.stub');

const encodingAction = {
  argumentValues: [getAttributeValue(), getAttributeValue()],
  argumentDefinitions: ['myIDENTIFIER', 'myIDENTIFIER'],
  isConvertedValues: [true, true],
  sourceId: 100,
  isForSending: true,
  countOverwriteFlag: true,
  preencryptedFlag: true,
  ackField: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, encodingAction) : encodingAction);
