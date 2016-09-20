const schema = require('../../app/schemaManager/schemas/TV.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getConnectedDataFromView(viewContent) {
    const cdList = [];
    if (_.has(viewContent, 'configuration')) {
      _.forEach(viewContent.configuration.textViewEntryPoints, (value, index, source) => {
        const data = common.moveConnectedData(value.connectedData);
        cdList.push(data.dataToStore);
        source[index].connectedData = data.connectedData; // eslint-disable-line no-param-reassign
      });
    }
    return cdList;
  },
  getSchemaJson: function () {
    return schema;
  },
};
