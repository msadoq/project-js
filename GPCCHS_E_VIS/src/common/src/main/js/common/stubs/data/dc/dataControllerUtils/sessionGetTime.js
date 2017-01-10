const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const getSessionGetTime = override => applyOverride({
  id: 42,
}, override);

const getSessionGetTimeProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.SessionGetTime',
  getSessionGetTime(override)
);

module.exports = {
  getSessionGetTime,
  getSessionGetTimeProtobuf,
};
