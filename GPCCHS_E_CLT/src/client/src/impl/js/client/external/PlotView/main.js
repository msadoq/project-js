const schema = require('./PlotView.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getSchemaJson: () => schema,
  getConnectedDataFromViewDocument: function(viewContent) { // TODO missing test
    const cdList = [];
    if (_.has(viewContent, 'configuration')) {
      _.forEach(viewContent.configuration.plotViewEntryPoints, (value, index, source) => {
        const dataX = common.moveConnectedData(value.connectedDataX);
        cdList.push(dataX.dataToStore);
        // eslint-disable-next-line no-param-reassign
        source[index].connectedDataX = dataX.connectedData;
        const dataY = common.moveConnectedData(value.connectedDataY);
        cdList.push(dataY.dataToStore);
        // eslint-disable-next-line no-param-reassign
        source[index].connectedDataY = dataY.connectedData;
      });
    }
    return cdList;
  },
  getConnectedDataFromState: function(state, viewId) {
    const entryPoints = _.get(state, `views.${viewId}.configuration.plotViewEntryPoints`);
    if (!entryPoints || !entryPoints.length) {
      return [];
    }

    const connectedData = _.get(state, 'connectedData');
    if (!connectedData || !Object.keys(connectedData).length) {
      return [];
    }

    const connectedDataIds = [];
    _.each(entryPoints, ep => {
      if (!ep) {
        return;
      }

      if (ep.connectedDataX && ep.connectedDataX.uuid) {
        connectedDataIds.push(ep.connectedDataX.uuid);
      }
      if (ep.connectedDataY && ep.connectedDataY.uuid) {
        connectedDataIds.push(ep.connectedDataY.uuid);
      }
    });

    return _.reduce(connectedDataIds, (list, id) => {
      return connectedData[id]
        ? list.concat(connectedData[id])
        : list;
    } , []);
  },
  getUsedValues: function(stateLocalId, field, visuWindow, offset, remoteIdPayload) {
    const lower = visuWindow.lower - offset;
    const upper = visuWindow.upper - offset;

    let final;
    if (stateLocalId) {
      final = Object.assign({}, stateLocalId);
    } else {
      final = { data: {}, index: []};
    }

    _.each(remoteIdPayload, (val, time) => {
      if (time >= lower && time <= upper) {
        const index = _.findIndex(final.index, (i) => i > time);
        if (index < 0) {
          final.index.push(time);
        } else {
          final.index = _.concat(_.slice(final.index, 0, index), time, _.slice(final.index, index));
        }
        final.data[time] = _.get(val, field, undefined);
      }
    });

    return final;
  }
};
