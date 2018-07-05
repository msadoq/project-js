const PusParameter = require('./pusParameter');
const PusServiceApid = require('./pusServiceApid');
const PusValue = require('./pusValue');
const ResetMessage = require('./resetMessage');
const SubscribeMessage = require('./subscribeMessage');
const SynchroniseMessage = require('./synchroniseMessage');
const UnsubscribeMessage = require('./unsubscribeMessage');
const CompareMessage = require('./compareMessage');
const HeaderMessage = require('./headerMessage');



module.exports = {
  PusParameter: { type: 'protobuf', adapter: PusParameter},
  PusServiceApid: { type: 'protobuf', adapter: PusServiceApid},
  PusValue: { type: 'protobuf', adapter: PusValue},
  ResetMessage: { type: 'protobuf', adapter: ResetMessage},
  SubscribeMessage: { type: 'protobuf', adapter: SubscribeMessage},
  SynchroniseMessage: { type: 'protobuf', adapter: SynchroniseMessage },
  UnsubscribeMessage: {type : 'protobuf', adapter : UnsubscribeMessage},
  CompareMessage: { type: 'protobuf', adapter: CompareMessage },
  HeaderMessage: { type: 'protobuf', adapter: HeaderMessage },
};
