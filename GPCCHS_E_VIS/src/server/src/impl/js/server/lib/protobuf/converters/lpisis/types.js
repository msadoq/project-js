/* eslint-disable no-underscore-dangle */

const {
  isInteger: _isInteger,
  isBuffer: _isBuffer,
  isNumber: _isNumber,
  isUndefined: _isUndefined,
  isNull: _isNull,
} = require('lodash');
const ByteBuffer = require('bytebuffer');
const ProtoBuf = require('protobufjs');

module.exports = {
  encodeAttribute: (attribute) => {
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
        if (_isInteger(attribute)) {
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
        if (_isBuffer(attribute)) {
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
  decodeAttribute: (attribute) => {
    if (attribute === null || typeof attribute === 'undefined') {
      return undefined;
    }

    let value = null;
    if (attribute._blob != null) {
      value = attribute._blob.value;
    } else if (attribute._boolean != null) {
      value = attribute._boolean.value;
    } else if (attribute._float != null) {
      value = attribute._float.value;
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
  ushortToBytes: (number) => {
    if (_isUndefined(number) || _isNull(number)) {
      return undefined;
    }

    if (!_isNumber(number)) {
      throw new Error(`Unable to convert '${number}' to short buffer`);
    }

    return new ByteBuffer(null, true).writeUint16(number).flip();
  },
  bytesToUshort: (buffer) => {
    if (!buffer || !buffer.buffer) {
      return undefined;
    }
    // Buffer is associated with key buffer
    if (!_isBuffer(buffer.buffer)) {
      return undefined;
    }
    return buffer.buffer.readUInt16LE(buffer.offset);
  },
  uintToBytes: (number) => {
    if (_isUndefined(number) || _isNull(number)) {
      return undefined;
    }

    if (!_isNumber(number)) {
      throw new Error(`Unable to convert '${number}' to int buffer`);
    }

    return new ByteBuffer(null, true).writeUint32(number).flip();
  },
  bytesToUint: (buffer) => {
    if (!buffer || !buffer.buffer) {
      return undefined;
    }
    // Buffer is associated with key buffer
    if (!_isBuffer(buffer.buffer)) {
      return undefined;
    }
    return buffer.buffer.readUInt32LE(buffer.offset);
  },
};
