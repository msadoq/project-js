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
};
