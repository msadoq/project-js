import _ from 'lodash/fp';

// reset formulas
const resetFieldX = _.set('connectedData.fieldX', '');
const resetformula = _.set('connectedData.formula', '');
const resetFormulas = _.compose(resetFieldX, resetformula);
const resetEntryPointsFormulas = _.update('entryPoints', _.map(resetFormulas));

export default _.pipe(
  resetEntryPointsFormulas
);
