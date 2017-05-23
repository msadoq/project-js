const dc = require('./data/dc');
const lpisis = require('./data/lpisis');
const flattenDataId = require('../utils/flattenDataId');

const stubs = Object.assign({}, dc, lpisis);

stubs.getRemoteId = (override) => {
  const r = stubs.getDataId(override);
  const remoteId = flattenDataId(r);
  return remoteId;
};

module.exports = stubs;
