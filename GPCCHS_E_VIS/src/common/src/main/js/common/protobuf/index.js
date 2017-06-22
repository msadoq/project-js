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
