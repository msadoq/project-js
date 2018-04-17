const PusDelta = require('./pusDelta');

module.exports = {
  encode: data => ({
    deltas: data.deltas.map(delta => PusDelta.encode(delta)),
    pusWholeModelId: data.pusWholeModelId,
    pusModelName: data.pusModelName,
  }),
  decode: data => ({
    deltas: data.deltas.map(delta => PusDelta.encode(delta)),
    pusWholeModelId: data.pusWholeModelId,
    pusModelName: data.pusModelName,
  }),
};
