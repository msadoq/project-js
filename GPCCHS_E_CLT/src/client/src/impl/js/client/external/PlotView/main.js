const schema = require('./PlotView.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getSchemaJson: () => schema,
  // TODO: memoize
  getConnectedDataFromState: function(configuration) {
    const entryPoints = _.get(configuration, ['plotViewEntryPoints'], []);
    return _.reduce(entryPoints, (list, ep) => {
      if (!ep) {
        return list;
      }

      if (ep.connectedDataX) {
        list = list.concat(ep.connectedDataX); // TODO : only if not the same params as Y
      }
      if (ep.connectedDataY) {
        list = list.concat(ep.connectedDataY);
      }

      return list;
    }, []);
  },
  getExpectedInterval: function(lower, current, upper) {
    return [lower, upper];
  },
  getUsedValues: function(stateLocalId, field, interval, remoteIdPayload) {
    let final;
    if (stateLocalId) {
      final = Object.assign({}, stateLocalId);
      const iLower = _.findIndex(final.index, (i) => i > interval[0]);
      const iUpper = _.findLastIndex(final.index, (i) => i < interval[1]); // , iLower < 0 ? 0 : iLower);
      //const iUpper = _.findIndex(final.index, (i) => i > interval[1], iLower < 0 ? 0 : iLower);
      if (iLower >= 0 || iUpper >= 0) {
        final.index = _.slice(final.index, iLower < 0 ? 0 : iLower,
          iUpper < 0 ? final.index.length : iUpper+1);
        const update = {};
        _.each(final.index, time => {
          update[time] = final.data[time];
        });
        final.data = update;
      }
    } else {
      final = { data: {}, index: []};
    }
    _.each(remoteIdPayload, payload => {
      const time = payload.timestamp;
      if (time >= interval[0] && time <= interval[1]) {
        if (_.findIndex(final.index, (i) => i === time) < 0) {
          const index = _.findIndex(final.index, (i) => i > time);
          if (index < 0) {
              final.index.push(time);
          } else {
            final.index = _.concat(_.slice(final.index, 0, index), time, _.slice(final.index, index));
          }
          final.data[time] = payload.payload[field];
        }
      }
    });
    return final;
  }
};
