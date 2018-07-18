// Produced by Acceleo JavaScript Generator 1.1.2
const attribute = require('./aTTRIBUTE');
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
const namedValue = require('./namedValue');
const indexedValue = require('./indexedValue');

module.exports = {
  ATTRIBUTE: { type: 'protobuf', adapter: attribute },
  BLOB: { type: 'protobuf', adapter:  blob },
  BOOLEAN: { type: 'protobuf', adapter:  boolean },
  DURATION: { type: 'protobuf', adapter:  duration },
  FLOAT: { type: 'protobuf', adapter:  float },
  DOUBLE: { type: 'protobuf', adapter:  double },
  IDENTIFIER: { type: 'protobuf', adapter:  identifier },
  OCTET: { type: 'protobuf', adapter:  octet },
  UOCTET: { type: 'protobuf', adapter:  uoctet },
  SHORT: { type: 'protobuf', adapter:  short },
  USHORT: { type: 'protobuf', adapter:  ushort },
  INTEGER: { type: 'protobuf', adapter:  integer },
  UINTEGER: { type: 'protobuf', adapter:  uinteger },
  LONG: { type: 'protobuf', adapter:  long },
  ULONG: { type: 'protobuf', adapter:  ulong },
  STRING: { type: 'protobuf', adapter:  string },
  TIME: { type: 'protobuf', adapter:  time },
  FINETIME: { type: 'protobuf', adapter:  finetime },
  URI: { type: 'protobuf', adapter:  uri },
  NamedValue: { type: 'protobuf', adapter: namedValue },
  IndexedValue: { type: 'protobuf', adapter: indexedValue },
};
