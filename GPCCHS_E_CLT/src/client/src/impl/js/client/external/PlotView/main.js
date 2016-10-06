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
};
