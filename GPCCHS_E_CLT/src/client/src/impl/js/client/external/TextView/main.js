const schema = require('./TextView.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getSchemaJson: () => schema,
  // TODO: memoize
  getConnectedDataFromState: function(configuration) {
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
  getExpectedInterval: function(lower, current) {
    return [current - 1e4, current]; // TODO getLast to TBD
  },
  getUsedValues: function(stateLocalId, field, interval, remoteIdPayload) {
    let final = {};
    if (stateLocalId) {
      final = Object.assign({}, stateLocalId);
    // } else {
    //   final = { data: {}, index: []};
    }

    _.each(remoteIdPayload, payload => {
      const time = payload.timestamp;
      if (time <= interval[1] && time >= interval[0]) {
        const oldTime = final.timestamp;
        if (!oldTime || oldTime < time) {
          // final.data = {};
          // final.data[time] = payload.payload[field] ;
          // final.index = [ time ];
          final.timestamp = time;
          final.value = payload.payload[field];
        }
      }
    });
    return final;
  }
};
