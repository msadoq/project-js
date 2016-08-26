const ProtoBuf = require('protobufjs');
const _ = require('lodash');

const builders = {};

const registerBuilder = (key, proto, ns) =>
  (builders[key] = ProtoBuf.loadProtoFile(`${__dirname}/proto/${proto}`).build(ns)[key]);

const getBuilder = key => {
  if (typeof builders[key] === 'undefined') {
    throw new Error('protobuf type no registered', key);
  }

  return builders[key];
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

const ns = 'dataControllerUtils.protobuf';
registerBuilder('DataId', 'DataId.proto', ns);
registerBuilder('DataQuery', 'DataQuery.proto', ns);
registerBuilder('DataSubscribe', 'DataSubscribe.proto', ns);
registerBuilder('DcResponse', 'DcResponse.proto', ns);
registerBuilder('Timestamp', 'Timestamp.proto', ns);

module.exports = {
  encode: (type, payload) => {
    const constructor = getBuilder(type);
    const protobuf = new constructor(payload);
    return protobuf.toBuffer();
  },
  decode: (type, buffer) => {
    const payload = getBuilder(type).decode(buffer).toRaw();
    return normalize(payload);
  },
};
