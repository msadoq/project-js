// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

// reset formulas
const resetFieldX = _.set('connectedData.fieldX', '');
const resetformula = _.set('connectedData.formula', '');
const resetFormulas = _.compose(resetFieldX, resetformula);
const resetEntryPointsFormulas = _.update('entryPoints', _.map(resetFormulas));

export default _.pipe(
  _.update('configuration', resetEntryPointsFormulas)
);
