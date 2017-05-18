import _ from 'lodash/fp';

// reset formulas
const resetFormula = _.set('connectedData.formula', '');
const resetEntryPointsFormula = _.update('entryPoints', _.map(resetFormula));

export default _.pipe(
  _.update('configuration', resetEntryPointsFormula)
);
