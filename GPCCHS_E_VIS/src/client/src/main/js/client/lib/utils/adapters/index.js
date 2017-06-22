const _each = require('lodash/each');
const _get = require('lodash/get');
const parameters = require('../../common/configurationManager');

const protobuf = require('common/protobuf');

const TYPE_PROTO = 'protobuf';
const TYPE_RAW = 'raw';
const comObjectTypes = {};
const types = {};

const registerGlobal = (override) => {
  const MESSAGES_NAMESPACES = override || parameters.get('MESSAGES_NAMESPACES');
  _each(MESSAGES_NAMESPACES, (msgNasmespaces) => {
    if (!types[msgNasmespaces.ns]) {
      types[msgNasmespaces.ns] = {};
    }
    const adapterPath = msgNasmespaces.path + msgNasmespaces.ns;
    const namespaces = require(adapterPath);  // eslint-disable-line
    const namespacesKeys = Object.keys(namespaces);
    _each(namespacesKeys, (adapters) => {
      if (!types[msgNasmespaces.ns][adapters]) {
        types[msgNasmespaces.ns][adapters] = {};
      }
      const adaptersKeys = Object.keys(namespaces[adapters]);
      _each(adaptersKeys, (adapter) => {
        let registeredAdapter;
        comObjectTypes[adapter] = `${msgNasmespaces.ns}.${adapters}.${adapter}`;
        switch (namespaces[adapters][adapter].type) {
          case TYPE_PROTO:
            registeredAdapter = registerProto(adapterPath,
                                              adapters,
                                              adapter,
                                              namespaces[adapters][adapter].adapter);
            registeredAdapter.type = TYPE_PROTO;
            break;
          case TYPE_RAW:
            registeredAdapter = registerRaw(namespaces[adapters][adapter].adapter);
            registeredAdapter.type = TYPE_RAW;
            break;
          default :
            throw new Error(`Unknown type '${adapter}' for registration`);
        }
        types[msgNasmespaces.ns][adapters][adapter] = registeredAdapter;
      });
    });
  });
};

const registerProto = (path, ns, adapter, mapper) => protobuf.register(path, ns, adapter, mapper);

const registerRaw = mapper => ({ mapper });

const encode = (type, raw) => {
  const builder = getMapper(type);
  switch (builder.type) {
    case TYPE_PROTO:
      return protobuf.encode(builder, raw);
    case TYPE_RAW:
      return builder.mapper.encode(raw);
    default:
      throw new Error(`Unknown type ${builder.type} to encode`);
  }
};

const decode = (type, buffer) => {
  const builder = getMapper(type);
  switch (builder.type) {
    case TYPE_PROTO:
      return protobuf.decode(builder, buffer);
    case TYPE_RAW:
      return builder.mapper.decode(buffer);
    default:
      throw new Error(`Unknown type ${builder.type} to decode`);
  }
};

const getMapper = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error(`protobuf type no registered ${key}`);
  }

  return type;
};

const getType = key => comObjectTypes[key];

module.exports = {
  registerGlobal,
  encode,
  decode,
  getType,
};
