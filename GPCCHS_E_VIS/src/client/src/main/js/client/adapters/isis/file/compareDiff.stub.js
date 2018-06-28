// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getCompareDiffParameter = require('./compareDiffParameter.stub');

const compareDiff = {
  fileDifference: true,
  documentProperties: [getCompareDiffParameter(), getCompareDiffParameter()],
  versionProperties: [getCompareDiffParameter(), getCompareDiffParameter()],
};

module.exports = override => (override ? _defaultsDeep({}, override, compareDiff) : compareDiff);
