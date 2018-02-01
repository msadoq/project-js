// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Optimize HSS perfs log and other stuffs
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Upgrade to protobuf 6 The following are impacted : - Loading .proto file - ByteBuffer is no longer used in 6x versions, protobufjs provides its own mechanism
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Protobuf messages namespaces are now loaded from parent process.
// VERSION : 1.1.2 : FA : #6671 : 16/05/2017 : Changes : - Change path in .proto file - Change mechansim to read in buffer in the adapter
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Fix .proto loading in server.js bundle
// VERSION : 1.1.2 : FA : #6671 : 16/05/2017 : Small modification on perf test implementation
// VERSION : 1.1.2 : FA : #6671 : 17/05/2017 : Merge branch 'dev' into pgaucher-upgrade-protobuff-6
// VERSION : 1.1.2 : FA : #6671 : 18/05/2017 : Clean code ( lint pass )
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : FA : #6798 : 16/06/2017 : Several changes : - Lint pass - Modify stub to use encode/decode of adapters (row AND protobuf) - Add a new stubs.js file to load the stubs present in the adapters plugins
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');

module.exports.register = function register(rootPath, namespace, proto, mapper) {
  let lookedUpType;
  const builder = ProtoBuf.loadSync(`${rootPath}/${namespace}/${proto}.proto`);
  if (!builder) {
    throw new Error(`Unable to read path: ${namespace}/${proto}.proto`);
  }
  try {
    lookedUpType = builder.lookup(`${namespace}.protobuf.${proto}`);
    lookedUpType.mapper = mapper;
  } catch (e) {
    throw new Error(`${namespace}.protobuf.${proto} can't be lookedUp`);
  }
  return lookedUpType;
};

module.exports.decode = function decodeTest(builder, buffer) {
  const raw = builder.decode(buffer);
  const r = builder.mapper
    ? builder.mapper.decode(raw)
    : raw;
  return r;
};
module.exports.encode = function encodeTest(builder, raw) {
  const payload = builder.mapper
    ? builder.mapper.encode(raw)
    : raw;
  const p = builder.encode(payload).finish();
  return p;
};
