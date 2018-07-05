const CompareMessage = require('./compareMessage');
const HeaderMessage = require('./headerMessage');



module.exports = {
  CompareMessage: { type: 'protobuf', adapter: CompareMessage },
  HeaderMessage: { type: 'protobuf', adapter: HeaderMessage },
};
