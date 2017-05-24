const protobuf = require('../../../index');
const applyOverride = require('../../applyOverride');

const getFMDDocumentProperty = override => applyOverride({
  key: 'myKey',
  value: 'myValue',
}, override);

const getFMDDocumentPropertyProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.FMDDocumentProperty',
  getFMDDocumentProperty(override)
);

module.exports = {
  getFMDDocumentProperty,
  getFMDDocumentPropertyProtobuf,
};
