// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _map = require('lodash/map');
const {
  encodeAttribute,
  decodeAttribute,
} = require('../types');

module.exports = {
  encode: data => ({
    uid: data.uid,
    arguments: _map(data.arguments, a => encodeAttribute(a)),
  }),
  decode: data => ({
    uid: data.uid.toNumber(),
    arguments: _map(data.arguments, a => decodeAttribute(a)),
  }),
};
