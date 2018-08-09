const _ = require('lodash/fp');
const ViewConfiguration = require('../../models/ViewConfiguration');

module.exports = {
  '*': (viewConfiguration) => {
    let updatedContent = viewConfiguration.content;

    const entryPoints = _.getOr([], 'entryPoints', viewConfiguration.content);

    const updatedEntryPoints = entryPoints.reduce((acc, cur) => [
      ...acc,
      _.set(['connectedData', 'dataType'], 'time_based_value', cur),
    ], []);

    updatedContent = _.set('entryPoints', updatedEntryPoints, updatedContent);

    return new ViewConfiguration(updatedContent);
  },
};
