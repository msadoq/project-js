const schema = require('../../app/schemaManager/schemas/TV.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getConnectedDataFromViewDocument: function(viewContent) {
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
  getConnectedDataFromState: function(state, entryPoints) {
    const ids = _.map(entryPoints, pt => {
      return pt.connectedData.uuid;
    });
    console.log('content',state.content);
    return _.reduce(_.get(state,'connectedData'), (result, data, key) => {
      if (_.indexOf(ids,key) >= 0) {
        Object.assign(result, { [key]: data });
      }
      return result;
    } , {});
  },
  getSchemaJson: function () {
    return schema;
  },
};
