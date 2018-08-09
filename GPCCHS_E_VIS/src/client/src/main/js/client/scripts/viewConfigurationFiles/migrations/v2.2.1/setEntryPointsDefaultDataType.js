const _ = require('lodash/fp');
const ViewConfiguration = require('../../models/ViewConfiguration');

module.exports = {
  '*': (viewConfiguration) => {
    let updatedContent = viewConfiguration.content;

    const entryPoints = _.get('entryPoints', viewConfiguration.content);

    if (!entryPoints || !Array.isArray(entryPoints)) {
      return viewConfiguration;
    }

    const updatedEntryPoints = entryPoints.reduce((acc, cur) => [
      ...acc,
      _.set(['connectedData', 'dataType'], 'time_based_data', cur),
    ], []);

    updatedContent = _.set('entryPoints', updatedEntryPoints, updatedContent);

    return new ViewConfiguration(updatedContent);
  },
};
