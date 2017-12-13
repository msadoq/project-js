// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

// reset formulas
const resetFormula = _.set('connectedData.formula', '');
const resetEntryPointsFormula = _.update('entryPoints', _.map(resetFormula));

export default _.pipe(
  _.update('configuration', resetEntryPointsFormula)
);
