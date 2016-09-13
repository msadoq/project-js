/* eslint-disable no-underscore-dangle */

const _ = require('lodash');
const ByteBuffer = require('bytebuffer');

module.exports = {
  encodeAttribute: attribute => {
    const mixedType = typeof attribute;
    if (
      attribute === null
      || mixedType === 'undefined'
      || (mixedType === 'number' && isNaN(attribute))) {
      return undefined;
    }

    let type;
    let value;

    switch (mixedType) {
      case 'string':
        type = '_string';
        value = attribute;
        break;
      case 'number': {
        if (_.isInteger(attribute)) {
          type = (attribute >= 0)
            ? '_uinteger'
            : '_integer';
        } else {
          type = '_double';
        }

        value = attribute;
        break;
      }
      case 'boolean':
        type = '_boolean';
        value = attribute;
        break;
      case 'object': {
        // TODO : complete with real received type parsing from DC/LPISIS
        if (_.isBuffer(attribute)) {
          type = '_blob';
          value = attribute;
          break;
        }
      }
      default: // eslint-disable-line no-fallthrough
        throw new Error(`Unknown data type ${mixedType}`);
    }

    return { [type]: { value } };
  },
  decodeAttribute: attribute => {
    if (attribute === null || typeof attribute === 'undefined') {
      return undefined;
    }

    let value = null;
    if (attribute._blob != null) {
      value = attribute._blob.value;
    } else if (attribute._boolean != null) {
      value = attribute._boolean.value;
    } else if (attribute.float != null) {
      value = attribute.float.value;
    } else if (attribute._double != null) {
      value = attribute._double.value;
    } else if (attribute._identifier != null) {
      value = attribute._identifier.value;
    } else if (attribute._octet != null) {
      value = attribute._octet.value;
    } else if (attribute._uoctet != null) {
      value = attribute._uoctet.value;
    } else if (attribute._short != null) {
      value = attribute._short.value;
    } else if (attribute._ushort != null) {
      value = attribute._ushort.value;
    } else if (attribute._integer != null) {
      value = attribute._integer.value;
    } else if (attribute._uinteger != null) {
      value = attribute._uinteger.value;
    } else if (attribute._long != null) {
      value = attribute._long.value;
    } else if (attribute._ulong != null) {
      value = attribute._ulong_blob.value;
    } else if (attribute._string != null) {
      value = attribute._string.value;
    } else if (attribute._time != null) {
      value = attribute._time.value;
    } else if (attribute._finetime != null) {
      value = attribute._finetime.value;
    } else if (attribute._rui != null) {
      value = attribute._rui.value;
    }

    return value;
  },
  uintToBytes: number => {
    if (_.isUndefined(number) || _.isNull(number)) {
      return undefined;
    }

    if (!_.isNumber(number)) {
      throw new Error(`Unable to convert '${number}' to int buffer`);
    }

    return new ByteBuffer().writeUint32(number).flip();
  },
  bytesToUint: buffer => {
    if (!_.isBuffer(buffer)) {
      return undefined;
    }

    return buffer.readUInt32BE();
  },
};
