const protobuf = require('../../../../protobuf/index');
const applyOverride = require('../../applyOverride');

const getSendLog = override => applyOverride({
  uid: 42,
  arguments: ['logArg1', 'logArg2'],
}, override);

const getSendLogProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.SendLog',
  getSendLog(override)
);

module.exports = {
  getSendLog,
  getSendLogProtobuf,
};
