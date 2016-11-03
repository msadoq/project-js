/* eslint-disable global-require */

const ProtoBuf = require('protobufjs');
const {
  each: _each,
  forOwn: _forOwn,
  isUndefined: _isUndefined,
  isNull: _isNull,
  isNaN: _isNaN,
  isString: _isString,
  isEmpty: _isEmpty,
  isObject: _isObject,
  isFunction: _isFunction,
  isArray: _isArray,
  pull: _pull,
  get: _get,
} = require('lodash');
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
        attach[proto] = {
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

const getType = (key) => {
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

register({
  dc: {
    dataControllerUtils: {
      Action: require('./converters/dc/dataControllerUtils/action'),
      Boolean: require('./converters/dc/dataControllerUtils/boolean'),
      DataId: require('./converters/dc/dataControllerUtils/dataId'),
      Domain: require('./converters/dc/dataControllerUtils/domain'),
      Domains: require('./converters/dc/dataControllerUtils/domains'),
      Filter: require('./converters/dc/dataControllerUtils/filter'),
      Header: require('./converters/dc/dataControllerUtils/header'),
      QueryArguments: require('./converters/dc/dataControllerUtils/queryArguments'),
      Status: require('./converters/dc/dataControllerUtils/status'),
      String: require('./converters/dc/dataControllerUtils/string'),
      TimeInterval: require('./converters/dc/dataControllerUtils/timeInterval'),
      Timestamp: require('./converters/dc/dataControllerUtils/timestamp'),
    },
  },
  lpisis: {
    decommutedParameter: {
      ReportingParameter: require('./converters/lpisis/decommutedParameter/reportingParameter'),
    },
  },
});

module.exports = {
  encode: (type, raw) => {
    const Builder = getType(type);
    let payload = Builder.mapper
      ? Builder.mapper.encode(raw)
      : raw;

    payload = removeEmpty(payload);

    const p = new Builder(payload);
    return p.toBuffer();
  },
  decode: (type, buffer) => {
    const builder = getType(type);
    const raw = builder.decode(buffer);
    return builder.mapper
      ? builder.mapper.decode(raw)
      : raw;
  },
  getType: comObject => comObjectProtobufTypes[comObject],
};
