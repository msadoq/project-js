// Generated file
const _map = require('lodash/map');
const decommutedValue = require('./decommutedValue');

module.exports = {
  encode: data => ({
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { value: data.onboardDate }
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { value: data.isNominal }
      : null,
    decommutedValues: _map(data.decommutedValues, d => (decommutedValue.encode(d))),
  }),
  decode: data => ({
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { type: 'time', value: data.onboardDate.value.toNumber() }
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { type: 'boolean', value: data.isNominal.value }
      : undefined,
    decommutedValues: _map(data.decommutedValues, d => (decommutedValue.decode(d))),
    referenceTimestamp: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
        ? { type: 'time', value: data.onboardDate.value.toNumber() }
        : undefined,
  }),
};

