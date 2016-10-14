const schema = require('./PlotView.schema.json');
const _ = require('lodash');

module.exports = {
  getSchemaJson: () => schema,
  // TODO: memoize
  getConnectedDataFromState: (configuration) => {
    const entryPoints = _.get(configuration, ['plotViewEntryPoints'], []);
    return _.reduce(entryPoints, (list, ep) => {
      if (!ep) {
        return list;
      }
      if (ep.connectedDataX) {
        // Check uuid
        list = list.concat(ep.connectedDataX); // TODO : only if not the same params as Y
      }
      if (ep.connectedDataY) {
        // Check uuid
        list = list.concat(ep.connectedDataY);
      }

      return list;
    }, []);
  },
  getExpectedInterval: (lower, current, upper) => {
    return [lower, upper];
  },
  getDisplayedValues: (stateLocalId, field, interval, remoteIdPayload) => {
    let final;
    if (stateLocalId) {
      final = Object.assign({}, stateLocalId);
      const iLower = _.findIndex(final.index, i => i > interval[0]);
      const iUpper = _.findLastIndex(final.index, i => i < interval[1]);
      if (iLower >= 0 || iUpper >= 0) {
        final.index = _.slice(final.index, iLower < 0 ? 0 : iLower,
          iUpper < 0 ? final.index.length : iUpper + 1);
        const update = {};
        _.each(final.index, (time) => {
          update[time] = final.data[time];
        });
        final.data = update;
      }
    } else {
      final = { data: {}, index: [] };
    }
    let lastIndex = 0;
    _.each(remoteIdPayload, (payload) => {
      const time = payload.timestamp;
      if (time >= interval[0] && time <= interval[1]) {
        if (_.findIndex(final.index, i => i === time, lastIndex) < 0) {
          const index = _.findIndex(final.index, i => i > time, lastIndex);
          if (index < 0) {
            final.index.push(time);
            lastIndex = final.index.length - 1;
          } else {
            final.index = _.concat(_.slice(final.index, 0, index), time, _.slice(final.index, index));
            lastIndex = index;
          }
        }
        final.data[time] = payload.payload[field];
      }
    });
    return final;
  }
};
