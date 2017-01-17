// Generated file
const applyOverride = require('../../applyOverride');
const getObjectKey = require('./objectKey');
const getObjectType = require('./objectType');

module.exports = override => applyOverride({
  objectType: getObjectType(),
  objectKey: getObjectKey(),
}, override);

