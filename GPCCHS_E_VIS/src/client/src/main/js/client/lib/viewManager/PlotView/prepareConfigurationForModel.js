import _ from 'lodash/fp';

// reset formulas
const resetFormulaX = _.set('connectedDataX.formula', '');
const resetFormulaY = _.set('connectedDataY.formula', '');
const resetFormulas = _.compose(resetFormulaX, resetFormulaY);
const resetEntryPointsFormulas = _.update('entryPoints', _.map(resetFormulas));

export default _.pipe(
  resetEntryPointsFormulas
);
