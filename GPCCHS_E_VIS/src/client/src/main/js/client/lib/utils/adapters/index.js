// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters
//  in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Add types.proto in dc - Add parse/stringify
//  mechanism to configurationManager
// VERSION : 1.1.2 : FA : #6798 : 16/06/2017 : Several changes : - Lint pass - Modify stub to use
//  encode/decode of adapters (row AND protobuf) - Add a new stubs.js file to load the stubs
//  present in the adapters plugins
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some
//  stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters :
//  - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix -
//  Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Fix dynamic require in packaging production mode
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Use path.join in registerGlobal in utils/adapters
// VERSION : 1.1.2 : FA : #7355 : 28/07/2017 : Change adapters dc and lpisis config to relative
//  path (config.default.json)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7453 : 08/08/2017 : Fix packaging about adapters .
// VERSION : 2.0.0 : FA : #8557 : 18/10/2017 : Add configuration file management for missions
//  adapters
// VERSION : 2.0.0 : FA : #8557 : 18/12/2017 : Fix load configuration file . .
// VERSION : 2.0.0 : FA : #8557 : 18/12/2017 : Update linting error on adapters file
// VERSION : 2.0.0 : DM : #5806 : 18/12/2017 : Fix eslintignore + lint utils/adapters
// VERSION : 2.0.0.2 : FA : #11812 : 18/04/2018 : Add management of StatsAggregation in VIMA +
//  update stub
// VERSION : 2.0.0.2 : FA : #11812 : 18/04/2018 : Fix bug on decode of StatAgg
// END-HISTORY
// ====================================================================

const { resolve } = require('path');
const _each = require('lodash/each');
const _get = require('lodash/get');
const protobuf = require('common/protobuf');

const parameters = require('../../common/configurationManager');
const getLogger = require('../../common/logManager');

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line
const rootVimaFolder = process.env.IS_BUNDLED === 'on' ? __dirname : resolve(__dirname, '../../..');

const TYPE_PROTO = 'protobuf';
const TYPE_RAW = 'raw';
const comObjectTypes = {};
const comObjectTypesAggreg = {
  ReportingParameter: 'ReportingParameterAggregation',
};
const types = {};
const fieldsMap = {};
const logger = getLogger('AdaptersManager');
let currentNamespace = '';

const registerGlobal = (override) => {
  const CLIENT_ADAPTERS = override || parameters.get('CLIENT_ADAPTERS');
  const MISSIONS_ADAPTERS = parameters.get('MISSIONS_ADAPTERS');
  register(CLIENT_ADAPTERS);
  if (MISSIONS_ADAPTERS) {
    register(MISSIONS_ADAPTERS);
  } else {
    logger.warn('Please provide MISSION_ADAPTERS array for specific mission adapters');
  }
  return fieldsMap;
};

const register = (namespaceArray) => {
  _each(namespaceArray, (msgNasmespaces) => {
    currentNamespace = msgNasmespaces.ns;
    if (!types[msgNasmespaces.ns]) {
      types[msgNasmespaces.ns] = {};
    }
    const adapterPath = resolve(rootVimaFolder, msgNasmespaces.path, msgNasmespaces.ns);
    try {
      const namespaces = dynamicRequire(adapterPath);
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
              fieldsMap[adapter] = registeredAdapter.fieldsKeys;
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
      logger.error(`An error occured during the loading of adapters '${currentNamespace}'`);
    }
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

const decodePayload = (buffer) => {
  const builder = getMapper('dc.dataControllerUtils.ADEPayload');
  const { genericPayload } = protobuf.decode(builder, buffer);
  if (genericPayload.length === 1) {
    return genericPayload[0].payload;
  }
  // Because the use of the comma operator is magnificient
  // eslint-disable-next-line 
  return genericPayload.reduce((acc, { header, payload }) => (acc[header.comObjectType] = protobuf.decode(getMapper(getType(header.comObjectType)), payload), acc), {});
};

const getFields = (comObjectName) => {
  const type = _get(fieldsMap, comObjectName);
  if (typeof type === 'undefined') {
    logger.error(`No fields found for ${comObjectName}`);
  }

  return type;
};

const getMapper = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error(`protobuf type no registered ${key}`);
  }

  return type;
};

const getType = key => comObjectTypes[key];
const getTypeAggreg = (key) => {
  const type = comObjectTypesAggreg[key];
  return type ? getType(type) : getType(key);
};

module.exports = {
  registerGlobal,
  encode,
  decode,
  decodePayload,
  getType,
  getFields,
  getTypeAggreg,
};
