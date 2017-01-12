/* eslint global-require:0 */

const ProtoBuf = require('protobufjs');
const _each = require('lodash/each');
const _forOwn = require('lodash/forOwn');
const _isUndefined = require('lodash/isUndefined');
const _isNull = require('lodash/isNull');
const _isNaN = require('lodash/isNaN');
const _isString = require('lodash/isString');
const _isEmpty = require('lodash/isEmpty');
const _isObject = require('lodash/isObject');
const _isFunction = require('lodash/isFunction');
const _isArray = require('lodash/isArray');
const _pull = require('lodash/pull');
const _get = require('lodash/get');
const { join } = require('path');

const types = {};
const comObjectProtobufTypes = {};

const register = (tree) => {
  _each(tree, (namespaces, root) => {
    if (!types[root]) {
      types[root] = {};
    }
    const rootPath = join(__dirname, 'proto', root);
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
          throw new Error(`Unable to read path: ${namespace}/${proto}.proto`);
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
  });
};

const getProtobufType = (key) => {
  const type = _get(types, key);

  if (typeof type === 'undefined') {
    throw new Error('protobuf type no registered', key);
  }

  return type;
};

const removeEmpty = (collection) => {
  _forOwn(collection, (value, key) => {
    if (
      _isUndefined(value)
      || _isNull(value)
      || _isNaN(value)
      || (_isString(value) && _isEmpty(value))
      || (_isObject(value) && !_isFunction(value) && _isEmpty(removeEmpty(value)))
    ) {
      // eslint-disable-next-line no-param-reassign
      delete collection[key];
    }
  });

  if (_isArray(collection)) {
    _pull(collection, undefined);
  }

  return collection;
};

module.exports = {
  encode: (type, raw) => {
    const Builder = getProtobufType(type);

    let payload = Builder.mapper
      ? Builder.mapper.encode(raw)
      : raw;

    payload = removeEmpty(payload);

    const p = new Builder(payload);

    return p.toBuffer();
  },
  decode: (type, buffer) => {
    const builder = getProtobufType(type);
    const raw = builder.decode(buffer);
    return builder.mapper
      ? builder.mapper.decode(raw)
      : raw;
  },
  getType: comObject => comObjectProtobufTypes[comObject],
};

register({
  dc: require('./adapters/dc'),
  lpisis: require('./adapters/lpisis'),
});
