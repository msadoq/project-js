const dc = require('./dc');
const lpisis = require('./lpisis');
const flattenDataId = require('../../utils/flattenDataId');

const stubs = Object.assign({
  getRemoteId: override => flattenDataId(stubs.getDataId(override)),
}, dc, lpisis);

module.exports = stubs;
