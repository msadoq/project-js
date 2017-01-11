const _map = require('lodash/map');

const decommutedValue = require('./decommutedValue');

module.exports = {
  encode: data => ({
    onboardDate: { value: data.onboardDate },
    groundDate: { value: data.groundDate },
    isNominal: { value: data.isNominal },
    decommutedValues: _map(data.decommutedValues, d => decommutedValue.encode(d)),
  }),
  decode: data => ({
    onboardDate: { type: 'time', value: data.onboardDate.value.toNumber() },
    groundDate: { type: 'time', value: data.groundDate.value.toNumber() },
    isNominal: { type: 'boolean', value: data.isNominal.value },
    decommutedValues: _map(data.decommutedValues, d => decommutedValue.decode(d)),
  }),
};
