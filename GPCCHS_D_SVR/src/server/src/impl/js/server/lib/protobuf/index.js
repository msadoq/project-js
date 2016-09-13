/* eslint-disable global-require */

const ProtoBuf = require('protobufjs');
const _ = require('lodash');
const { join } = require('path');

const types = {};

const register = (tree) => {
  _.each(tree, (namespaces, root) => {
    if (!types[root]) {
      types[root] = {};
    }
    const rootPath = join(__dirname, 'proto', root);
    _.each(namespaces, (protos, namespace) => {
      const namespaceBuilder = ProtoBuf.newBuilder();
      const attach = {};
      _.each(protos, (mapper, proto) => {
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
      _.each(types[root][namespace], (type, typeKey) => {
        Object.assign(type, attach[typeKey]);
      });
    });
  });
};

const getType = key => {
  const type = _.get(types, key);

  if (typeof type === 'undefined') {
    throw new Error('protobuf type no registered', key);
  }

  return type;
};

const removeEmpty = collection => {
  _.forOwn(collection, (value, key) => {
    if (
      _.isUndefined(value)
      || _.isNull(value)
      || _.isNaN(value)
      || (_.isString(value) && _.isEmpty(value))
      || (_.isObject(value) && !_.isFunction(value) && _.isEmpty(removeEmpty(value)))
    ) {
      // eslint-disable-next-line no-param-reassign
      delete collection[key];
    }
  });

  if (_.isArray(collection)) {
    _.pull(collection, undefined);
  }

  return collection;
};

register({
  dc: {
    dataControllerUtils: {
      DataQuery: require('./converters/dc/dataQuery'),
      DataSubscribe: require('./converters/dc/dataSubscribe'),
      DcResponse: require('./converters/dc/dcResponse'),
      NewDataMessage: require('./converters/dc/newDataMessage'),
      DomainQuery: require('./converters/dc/domainQuery'),
      DomainResponse: require('./converters/dc/domainResponse'),
      DcClientMessage: require('./converters/dc/dcClientMessage'),
      DcServerMessage: require('./converters/dc/dcServerMessage')
    },
  },
  lpisis: {
    decommutedParameter: {
      ReportingParameter: require('./converters/lpisis/reportingParameter'),
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
    const raw = builder.decode(buffer).toRaw();
    return builder.mapper
      ? removeEmpty(builder.mapper.decode(raw))
      : removeEmpty(raw);
  },
};
