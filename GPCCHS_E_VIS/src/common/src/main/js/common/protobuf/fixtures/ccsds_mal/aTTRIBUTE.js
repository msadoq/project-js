// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _isInteger = require('lodash/isInteger');
const _isBuffer = require('lodash/isBuffer');

const blob = require('./bLOB');
const boolean = require('./bOOLEAN');
const duration = require('./dURATION');
const float = require('./fLOAT');
const double = require('./dOUBLE');
const identifier = require('./iDENTIFIER');
const octet = require('./oCTET');
const uoctet = require('./uOCTET');
const short = require('./sHORT');
const ushort = require('./uSHORT');
const integer = require('./iNTEGER');
const uinteger = require('./uINTEGER');
const long = require('./lONG');
const ulong = require('./uLONG');
const string = require('./sTRING');
const time = require('./tIME');
const finetime = require('./fINETIME');
const uri = require('./uRI');

module.exports = {
  encode: (attribute) => {
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
            ? '_ulong'
            : '_long';
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
        if (_isBuffer(attribute)) {
          type = '_blob';
          value = attribute;
        }
        break;
      }
      default:
        throw new Error(`Unknown data type ${mixedType}`);
    }
    return { [type]: { value } };
  },
  decode: (attribute) => {
    if (attribute === null || typeof attribute === 'undefined') {
      return undefined;
    }

    if (attribute._blob != null) {
      return blob.decode(attribute._blob);
    }
    if (attribute._boolean != null) {
      return boolean.decode(attribute._boolean);
    }
    if (attribute._float != null) {
      return float.decode(attribute._float);
    }
    if (attribute._double != null) {
      return double.decode(attribute._double);
    }
    if (attribute._duration != null) {
      return duration.decode(attribute._duration);
    }
    if (attribute._identifier != null) {
      return identifier.decode(attribute._identifier);
    }
    if (attribute._octet != null) {
      return octet.decode(attribute._octet);
    }
    if (attribute._uoctet != null) {
      return uoctet.decode(attribute._uoctet);
    }
    if (attribute._short != null) {
      return short.decode(attribute._short);
    }
    if (attribute._ushort != null) {
      return ushort.decode(attribute._ushort);
    }
    if (attribute._integer != null) {
      return integer.decode(attribute._integer);
    }
    if (attribute._uinteger != null) {
      return uinteger.decode(attribute._uinteger);
    }
    if (attribute._long != null) {
      return long.decode(attribute._long);
    }
    if (attribute._ulong != null) {
      return ulong.decode(attribute._ulong);
    }
    if (attribute._string != null) {
      return string.decode(attribute._string);
    }
    if (attribute._time != null) {
      return time.decode(attribute._time);
    }
    if (attribute._finetime != null) {
      return finetime.decode(attribute._finetime);
    }
    if (attribute._uri != null) {
      return uri.decode(attribute._uri);
    }

    return null;
  },
};
