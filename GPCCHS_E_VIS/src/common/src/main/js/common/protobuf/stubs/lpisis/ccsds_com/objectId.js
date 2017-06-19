// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getObjectKey = require('./objectKey');
const getObjectType = require('./objectType');

module.exports = override => applyOverride({
  objectType: getObjectType(),
  objectKey: getObjectKey(),
}, override);

