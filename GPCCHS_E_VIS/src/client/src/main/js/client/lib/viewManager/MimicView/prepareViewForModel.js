// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 03/05/2017 : first functionnal mimic with animations
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

// reset formulas
const resetFormula = _.set('connectedData.formula', '');
const resetEntryPointsFormula = _.update('entryPoints', _.map(resetFormula));

export default _.pipe(
  _.update('configuration', resetEntryPointsFormula)
);
