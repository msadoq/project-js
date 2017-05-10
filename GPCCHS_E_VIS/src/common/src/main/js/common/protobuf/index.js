const ProtoBuf = require('protobufjs');
const _each = require('lodash/each');
const _get = require('lodash/get');
const { join } = require('path');

const dc = require('./adapters/dc');
const lpisis = require('./adapters/lpisis');

const types = {};
const comObjectProtobufTypes = {};

function register(tree) {
  _each(tree, (namespaces, root) => {
    if (!types[root]) {
      types[root] = {};
    }
    const rootPath = join(__dirname, 'proto', root);
    _each(namespaces, (protos, namespace) => {
      const attach = {};
      types[root][namespace] = {};
      
      _each(protos, (mapper, proto) => {
        
        // append definition to builder
        const builder = ProtoBuf.loadSync(`${rootPath}/${namespace}/${proto}.proto`);
        if (!builder) {
          throw new Error(`Unable to read path: ${namespace}/${proto}.proto`);
        }

        const test = builder.resolve();
        //console.log(`---------${namespace}/${proto}---------`);
        // console.log(test.nested[namespace].nested.protobuf.nested);
        
         for (var key in test.nested[namespace].nested.protobuf.nested) {
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
  });
}

const getProtobufType = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error('protobuf type no registered', key);
  }

  return type;
};

module.exports.encode = function encode(type, raw) {
  const Builder = getProtobufType(type);
  // console.log(Builder);
  const payload = Builder.mapper
    ? Builder.mapper.encode(raw)
    : raw;
  const p = Builder.encode(payload).finish();
  return p;
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

register({
  dc,
  lpisis: Object.assign(lpisis, { ccsds_mal: { types: null } }),
});
