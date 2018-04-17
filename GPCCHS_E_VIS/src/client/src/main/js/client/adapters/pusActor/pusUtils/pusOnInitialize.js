const tIME = require('../ccsds_mal/tIME');
const PusWholeModel = require('./pusWholeModel');
const PusDelta = require('./pusDelta');

module.exports = {
  encode: data => ({
    pusWholeModel: PusWholeModel.encode(data.pusWholeModel),
    deltas: data.deltas.map(delta => PusDelta.encode(delta))
  }),
  decode: data => ({
    pusWholeModel: PusWholeModel.decode(data.pusWholeModel),
    deltas: data.deltas.map(delta => PusDelta.decode(delta))
  }),
};