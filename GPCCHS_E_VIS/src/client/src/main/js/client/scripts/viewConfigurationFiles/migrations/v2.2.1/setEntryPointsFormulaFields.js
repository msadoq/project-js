const _ = require('lodash/fp');
const ViewConfiguration = require('../../models/ViewConfiguration');

const { parseFormula } = require('./parseFormula');

module.exports = {
  '*': (viewConfiguration) => {
    let updatedContent = viewConfiguration.content;

    const entryPoints = _.get('entryPoints', viewConfiguration.content);

    if (!entryPoints || !Array.isArray(entryPoints)) {
      return viewConfiguration;
    }

    const updatedEntryPoints = entryPoints.reduce((acc, cur) => {
      const formula = _.get(['connectedData', 'formula'], cur);
      const formulaParams = parseFormula(formula) || {};

      const updatedConnectedData =
        _.assign(
          _.getOr({}, 'connectedData', cur),
          formulaParams
        );

      return [
        ...acc,
        _.set('connectedData', updatedConnectedData, cur),
      ];
    }, []);

    updatedContent = _.set('entryPoints', updatedEntryPoints, updatedContent);

    return new ViewConfiguration(updatedContent);
  },
};
