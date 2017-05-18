const ProtoBuf = require('protobufjs');
const _each = require('lodash/each');
const _get = require('lodash/get');

const types = {};
const comObjectProtobufTypes = {};

function getProtobufType(key) {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error(`protobuf type no registered ${key}`);
  }

  return type;
}

module.exports.register = function register(rootPath, root, namespaces) {
  if (!types[root]) {
    types[root] = {};
  }
  _each(namespaces, (protos, namespace) => {
    const namespaceBuilder = ProtoBuf.newBuilder();
    const attach = {};
    _each(protos, (mapper, proto) => {
      // append definition to builder
      const builder = ProtoBuf.loadProtoFile({
        root: rootPath,
        file: `${namespace}/${proto}.proto`,
      }, namespaceBuilder);

      if (!builder) {
        throw new Error(`Unable to read path: ${rootPath}/${namespace}/${proto}.proto`);
      }

      // store builder and mapper pour further linking
      attach[proto.charAt(0).toUpperCase() + proto.slice(1)] = {
        builder,
        mapper,
      };
    });

    // store parser and attach
    types[root][namespace] = namespaceBuilder.build(namespace).protobuf;
    _each(types[root][namespace], (type, typeKey) => {
      Object.assign(type, attach[typeKey]);
      comObjectProtobufTypes[typeKey] = `${root}.${namespace}.${typeKey}`;
    });
  });
};

module.exports.encode = function encode(type, raw) {
  const Builder = getProtobufType(type);

  const payload = Builder.mapper
    ? Builder.mapper.encode(raw)
    : raw;

  const p = new Builder(payload);
  return p.toBuffer();
};

module.exports.decode = function decode(type, buffer) {
  const builder = getProtobufType(type);
  const raw = builder.decode(buffer);
  return builder.mapper
    ? builder.mapper.decode(raw)
    : raw;
};

module.exports.getType = function getType(comObject) {
  return comObjectProtobufTypes[comObject];
};
