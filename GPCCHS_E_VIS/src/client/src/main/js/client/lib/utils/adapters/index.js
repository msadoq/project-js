import _each from 'lodash/each';
import _get from 'lodash/get';
import parameters from '../../common/configurationManager';

const protobuf = require('common/protobuf');

const TYPE_PROTO = 'protobuf';
const TYPE_RAW = 'raw';
const comObjectTypes = {};
const types = {};

const registerGlobal = () => {
  const MESSAGES_NAMESPACES = parameters.get('MESSAGES_NAMESPACES');
  
  _each(MESSAGES_NAMESPACES, (msgNasmespaces) => {
    if (!types[msgNasmespaces.ns]) {
      types[msgNasmespaces.ns] = {};
    }
    //console.log("MESSAGES_NAMESPACES :", msgNasmespaces);
    const adapterPath = msgNasmespaces.path + msgNasmespaces.ns;
    //console.log('AdapterPath :', adapterPath);
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
            registeredAdapter = registerProto(msgNasmespaces.ns, adapterPath, adapters, adapter, namespaces[adapters][adapter].adapter);
            registeredAdapter.type = TYPE_PROTO;
            break;
          case TYPE_RAW:
            registeredAdapter = registerRaw(adapters, adapter, namespaces[adapters][adapter].adapter);
            registeredAdapter.type = TYPE_RAW;
            break;
          default:
            console.log('Unknown type for registration');
        }
        types[msgNasmespaces.ns][adapters][adapter] = registeredAdapter;
      });
    });
  });
  console.log("RegisteredTypes : ", types);
  console.log("ComObjectTypes : ", comObjectTypes);
};

const registerProto = (rootPath, namespace, adapter, mapper) => {
  // registerTest()
  return protobuf.registerTest(rootPath, namespace, adapter, mapper);
};

const registerRaw = (rootPath, namespace, adapter, mapper) => {
  console.log('registerRaw');
};

const encode = (type, raw) => {
  const builder = getType(type);
  switch (builder.type) {
    case TYPE_PROTO:
      return protobuf.encodeTest(builder, raw);
    case TYPE_RAW:
      return builder.mapper.encode(raw);
    default:
      console.log('Unknown type for registration');
  }
};

const decode = (type, buffer) => {
  const builder = getType(type);
  switch (builder.type) {
    case TYPE_PROTO:
      return protobuf.decodeTest(builder, buffer);
    case TYPE_RAW:
      return builder.mapper.decode(buffer);
    default:
      console.log('Unknown type for registration');
  }
};

const getType = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error(`protobuf type no registered ${key}`);
  }

  return type;
};

// const lowerCaseFirstLetter = string => string.charAt(0).toLowerCase() + string.slice(1);

module.exports = {
  registerGlobal,
  encode,
  decode,
};
