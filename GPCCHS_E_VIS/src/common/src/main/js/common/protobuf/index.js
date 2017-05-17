const ProtoBuf = require('protobufjs');
const _each = require('lodash/each');
const _get = require('lodash/get');

const types = {};
const comObjectProtobufTypes = {};


module.exports.register = function register(rootPath, root, namespaces) {
  if (!types[root]) {
    types[root] = {};
  }
  _each(namespaces, (protos, namespace) => {
    types[root][namespace] = {};
    _each(protos, (mapper, proto) => {
      // append definition to builder
      const builder = ProtoBuf.loadSync(`${rootPath}/${namespace}/${proto}.proto`);
      if (!builder) {
        throw new Error(`Unable to read path: ${namespace}/${proto}.proto`);
      }
      const test = builder.resolve();
      for ( const key in test.nested[namespace].nested.protobuf.nested) {
        types[root][namespace][key] = {};
        comObjectProtobufTypes[key] = `${root}.${namespace}.${key}`;
        try {
          const AwesomeMessage = builder.lookupType(`${namespace}.protobuf.${key}`);
          AwesomeMessage.mapper = mapper;
          // store builder and mapper pour further linking
          types[root][namespace][key] = AwesomeMessage;
          // attach[proto.charAt(0).toUpperCase() + proto.slice(1)] = AwesomeMessage;
        } catch (e) {
          console.log("error");
        }
      }
    });

      // store parser and attach
       // types[root][namespace] = namespaceBuilder.build(namespace).protobuf;
      /* _each(types[root][namespace], (type, typeKey) => {
        Object.assign(type, attach[typeKey]);
        comObjectProtobufTypes[typeKey] = `${root}.${namespace}.${typeKey}`;
      });*/
  });
};

const getProtobufType = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error(`protobuf type no registered ${key}`);
  }

  return type;
}

/* module.exports.register = function register(rootPath, root, namespaces) {
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
}; */

module.exports.encode = function encode(type, raw) {
  const Builder = getProtobufType(type);

  // console.log(Builder);
  const payload = Builder.mapper
    ? Builder.mapper.encode(raw)
    : raw;
  const p = Builder.encode(payload).finish();
  return p;
};

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

module.exports.decode = function decode(type, buffer) {
  const builder = getProtobufType(type);
  const raw = builder.decode(buffer);
  const r = builder.mapper
    ? builder.mapper.decode(raw)
    : raw;
  return r;
};

module.exports.getType = function getType(comObject) {
  return comObjectProtobufTypes[comObject];
};
