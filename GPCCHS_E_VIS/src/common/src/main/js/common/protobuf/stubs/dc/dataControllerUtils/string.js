const protobuf = require('../../../index');

const getString = (string = 'defaultString') => ({
  string,
});
const getStringProtobuf = string => protobuf.encode(
  'dc.dataControllerUtils.String',
  getString(string)
);

module.exports = {
  getString,
  getStringProtobuf,
};
