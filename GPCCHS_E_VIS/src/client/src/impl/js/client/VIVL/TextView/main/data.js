const schema = require('./TextView.schema.json');
const _ = require('lodash');

module.exports = {
  getSchemaJson: () => schema,
  // TODO: memoize
  getConnectedDataFromState: (configuration) => {
    const entryPoints = _.get(configuration, ['textViewEntryPoints'], []);
    return _.reduce(entryPoints, (list, ep) => {
      if (!ep) {
        return list;
      }
      if (ep.connectedData) {
        list = list.concat(ep.connectedData);
      }
      return list;
    }, []);
  },
  getExpectedInterval: (lower, current) => {
    return [current - 1e4, current]; // TODO getLast to TBD
  },
  getDisplayedValues: (stateLocalId, field, interval, remoteIdPayload) => {
    const final = {};
    _.each(remoteIdPayload, (payload) => {
      const time = payload.timestamp;
      if (time <= interval[1] && time >= interval[0]) {
        const oldTime = (final.timestamp || (stateLocalId && stateLocalId.timestamp));
        if (!oldTime || oldTime <= time) {
          final.timestamp = time;
          final.value = payload.payload[field];
        }
      }
    });
    if (final.value) {
      return final;
    }
    return stateLocalId;
  }
};
