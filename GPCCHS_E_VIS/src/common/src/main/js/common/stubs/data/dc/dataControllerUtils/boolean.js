const protobuf = require('../../../../protobuf');

const getBoolean = (boolean = false) => ({
  boolean,
});

const getBooleanProtobuf = boolean => protobuf.encode(
  'dc.dataControllerUtils.Boolean',
  getBoolean(boolean)
);

module.exports = {
  getBoolean,
  getBooleanProtobuf,
};
