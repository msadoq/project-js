const dcStubs = require('./data/dc');
const lpisisStubs = require('./data/lpisis');
const flattenDataId = require('../utils/flattenDataId');

const stubs = Object.assign({}, dcStubs, lpisisStubs);

// RemoteId
stubs.getRemoteId = (override) => {
  const r = stubs.getDataId(override);
  const remoteId = flattenDataId(r);
  return remoteId;
};

module.exports = stubs;
