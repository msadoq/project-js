const schema = require('../../app/schemaManager/schemas/MV.schema.json');

module.exports = {
  getConnectedDataFromView(viewContent) {
    const cdList = [];
    if (_.has(viewContent, 'configuration')) {
      _.forEach(viewContent.configuration.mimicViewEntryPoints, (value, index, source) => {
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
