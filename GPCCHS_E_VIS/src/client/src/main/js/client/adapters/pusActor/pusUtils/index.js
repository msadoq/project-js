const PusCompare = require('./pusCompare');
const PusDelta = require('./pusDelta');
const PusHeader = require('./pusHeader');
const PusInitialize = require('./pusInitialize');
const PusSubscribe = require('./pusSubscribe');
const PusUnsubscribe = require('./pusUnsubscribe');
const PusReset = require('./pusReset');
const PusOnInitialize = require('./pusOnInitialize');
const PusOnPubSub = require('./pusOnPubSub');
// const PusOnCompare = require('./pusOnCompare');


module.exports = { 
  PusCompare: { type: 'protobuf', adapter: PusCompare },
  PusDelta: { type: 'protobuf', adapter: PusDelta },
  PusHeader: { type: 'protobuf', adapter: PusHeader },
  PusInitialize: { type: 'protobuf', adapter: PusInitialize },
  PusSubscribe: { type: 'protobuf', adapter: PusSubscribe },
  PusUnsubscribe: { type: 'protobuf', adapter: PusUnsubscribe },
  PusReset: { type: 'protobuf', adapter: PusReset },
  PusOnInitialize: { type: 'protobuf', adapter: PusOnInitialize },
  PusOnPubSub: { type: 'protobuf', adapter: PusOnPubSub },
  // PusOnCompare: { type: 'protobuf', adapter: PusOnCompare },
};
