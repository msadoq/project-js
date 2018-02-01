/* eslint-disable */
const fs = require('fs');
const protobuf = require('common/protobuf');
const { resolve } = require('path');
const _get = require('lodash/get');

const TYPE_PROTO = 'protobuf';
const TYPE_RAW = 'raw';
const comObjectTypes = {};
const types = {};

const rootVimaFolder = resolve(__dirname, '../../');
let currentNamespace = '';


const registerGlobal = () => {
  CLIENT_ADAPTERS.forEach((msgNasmespaces) => {
    currentNamespace = msgNasmespaces.ns;
    if (!types[msgNasmespaces.ns]) {
      types[msgNasmespaces.ns] = {};
    }
    const adapterPath = resolve(rootVimaFolder, msgNasmespaces.path, msgNasmespaces.ns);
    try {
      const namespaces = require(adapterPath);
      const namespacesKeys = Object.keys(namespaces);
      namespacesKeys.forEach((adapters) => {
        if (!types[msgNasmespaces.ns][adapters]) {
          types[msgNasmespaces.ns][adapters] = {};
        }
        const adaptersKeys = Object.keys(namespaces[adapters]);
        adaptersKeys.forEach((adapter) => {
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
    } catch (e) {
      console.error(`An error occured during the loading of adapters '${currentNamespace}'`);
      console.log(e);
    }
  });
};

const registerProto = (path, ns, adapter, mapper) => protobuf.register(path, ns, adapter, mapper);

const registerRaw = mapper => ({ mapper });

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


const decodeArchiveDumb = (buffer, comObject) => {
  const payloadProtobufType = getType(comObject);
  const payload = decode(payloadProtobufType, buffer);
  console.log(JSON.stringify(payload, null, 2));
};


if(!process.argv[2] || !process.argv[3]) {
  console.info('Usage : node protobufReader <path/To/Dump.arc> "Name of the comObject"');
  return;
}

const file = process.argv[2];
const typeComObject = process.argv[3];
const { CLIENT_ADAPTERS } = JSON.parse(fs.readFileSync('../../config.default.json', 'utf8'));

registerGlobal();
// console.log(comObjectTypes);

fs.readFile(file, (err, data) => {
  if (err) {
    return;
  }
  decodeArchiveDumb(data, typeComObject);
});
