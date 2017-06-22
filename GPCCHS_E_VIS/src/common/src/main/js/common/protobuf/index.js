const ProtoBuf = require('protobufjs');
const _get = require('lodash/get');

const types = {};
const typesTest = {};
const comObjectProtobufTypes = {};

module.exports.register = function register(root, rootPath, namespace, proto, mapper) {
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
  // console.log("****************************************************");
  // console.log(builder);
  // console.log("---------------------------------------------------");
  const payload = builder.mapper
    ? builder.mapper.encode(raw)
    : raw;
  const p = builder.encode(payload).finish();
  return p;
};


const getProtobufType = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error(`protobuf type no registered ${key}`);
  }

  return type;
};

module.exports.getTypesTest = () => typesTest;


module.exports.decodeAdapter = function decode(type, buffer) {
  const builder = getProtobufType(type);
  const raw = builder.decode(buffer);
  const r = builder.mapper
    ? builder.mapper.decode(raw)
    : raw;
  return r;
};

module.exports.decodeNoAdapter = function decode(type, buffer) {
  const builder = getProtobufType(type);
  const raw = builder.decode(buffer);
  return raw;
};

module.exports.decodeOld = function decode(type, buffer) {
  const builder = getProtobufType(type);
  const raw = builder.decode(buffer);
  const r = builder.mapper
    ? builder.mapper.decode(raw)
    : raw;
  return r;
};

module.exports.encodeOld = function encode(type, raw) {
  const Builder = getProtobufType(type);

  // console.log(Builder);
  const payload = Builder.mapper
    ? Builder.mapper.encode(raw)
    : raw;
  const p = Builder.encode(payload).finish();
  return p;
};

module.exports.getType = function getType(comObject) {
  return comObjectProtobufTypes[comObject];
};
