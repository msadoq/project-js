const schema = require('./PlotView.schema.json');
const common = require('../common');
const _ = require('lodash');

function getEntryPoints() {
  const idX = _.map(entryPoints, pt => {
    return { uuid: pt.connectedDataX.uuid };
  });
  const cDataX = _.reduce(_.get(state,'connectedData'), (result, data, key) => {
    if (_.find(idX, {'uuid': key})) {
      (result || (result = [])).push({key: data});
    }
    console.log('result', result);
    return result;
  } , []);
}
module.exports = {
  getConnectedDataFromViewDocument: function(viewContent) {
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
  getConnectedDataFromState: function(state, entryPoints) {
    const idX = _.map(entryPoints, pt => {
      return pt.connectedDataX.uuid;
    });
    const idY = _.map(entryPoints, pt => {
      return pt.connectedDataY.uuid;
    });
    const ids = _.concat(idX, idY);
    return _.reduce(_.get(state,'connectedData'), (result, data, key) => {
      if (_.indexOf(ids,key) >= 0) {
        Object.assign(result, { [key]: data });
      }
      return result;
    } , {});
  },
  getSchemaJson: function () {
    return schema;
  }
};
