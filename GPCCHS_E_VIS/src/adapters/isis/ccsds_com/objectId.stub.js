// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const applyOverride = require('../applyOverride');
const getObjectKey = require('./objectKey.stub');
const getObjectType = require('./objectType.stub');

module.exports = override => applyOverride({
  objectType: getObjectType(),
  objectKey: getObjectKey(),
}, override);
