const schema = require('../../app/schemaManager/schemas/PV.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getConnectedDataFromView: function(viewContent) {
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
  getSchemaJson: function () {
    return schema;
  }
};
