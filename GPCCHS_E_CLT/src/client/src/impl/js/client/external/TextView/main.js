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
  getUsedValues: function(stateLocalId, field, visuWindow, offset, remoteIdPayload) {
    const current = visuWindow.current - offset;

    let final;
    if (stateLocalId) {
      final = Object.assign({}, stateLocalId);
    } else {
      final = { data: {}, index: []};
    }

    _.each(remoteIdPayload, (val, time) => {
      if (time <= current) {
        const oldTime = _.head(Object.keys(final.data));
        if (!oldTime || oldTime < time) {
          final.data = {};
          final.data[time] = val[field] ;
          final.index = [ time ];
        }
      }
    });
    return final;
  }
};
