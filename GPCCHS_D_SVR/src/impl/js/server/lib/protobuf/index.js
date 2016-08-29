const ProtoBuf = require('protobufjs');
const _ = require('lodash');
const { join } = require('path');

const builders = {};

const register = (tree) => {
  _.each(tree, (namespaces, root) => {
    if (!builders[root]) {
      builders[root] = {};
    }
    const rootPath = join(__dirname, 'proto', root);
    _.each(namespaces, (protos, namespace) => {
      const namespaceBuilder = ProtoBuf.newBuilder();
      _.each(protos, proto => {
        // append definition to builder
        const build = ProtoBuf.loadProtoFile({
          root: rootPath,
          file: `${namespace}/${proto}.proto`,
        }, namespaceBuilder);

        if (!build) {
          throw new Error(`Unable to read path: ${namespace}/${proto}.proto`);
        }
      });

      builders[root][namespace] = namespaceBuilder.build(namespace).protobuf;
    });
  });
};

const getBuilder = key => {
  const builder = _.get(builders, key);

  if (typeof builder === 'undefined') {
    throw new Error('protobuf type no registered', key);
  }

  return builder;
};

/**
 * Walk collection (Array or Object) recursively:
 * - remove null or undefined keys
 * - convert Protobuf.Long to runtime integer
 *
 * @param collection
 * @returns {Object}
 */
const normalize = collection => {
  const withNull = _[(_.isArray(collection) ? 'map' : 'mapValues')](collection, (value) => {
    if (value && value.constructor === ProtoBuf.Long) {
      return value.toNumber();
    }
    if (_.isArray(value) || _.isObject(value)) {
      return normalize(value);
    }

    return value;
  });
  return _.omitBy(withNull, value => typeof value === 'undefined' || value === null);
};

register({
  dc: {
    dataControllerUtils: [
      'DataId',
      'DataQuery',
      'DataSubscribe',
      'DcResponse',
      'Timestamp',
    ],
  },
  lpisis: {
    decommutedParameter: ['ReportingParameter'],
    packet: ['TmPacket'],
  },
});

module.exports = {
  encode: (type, payload) => {
    const constructor = getBuilder(type);
    const protobuf = new constructor(payload);
    return protobuf.toBuffer();
  },
  decode: (type, buffer) => {
    const payload = getBuilder(type).decode(buffer).toRaw(true);
    return normalize(payload);
  },
};
