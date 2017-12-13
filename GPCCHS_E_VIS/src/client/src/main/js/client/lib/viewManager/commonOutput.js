// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Add commonOutput as identity (for now)
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Simplify saveViewAs function in documentManager
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Simplify saveViewAs function in documentManager
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { VM_COMMON_PROPERTIES } from './constants';

// used by all 'prepareViewForFile'
export default view => ({
  ..._.pick(VM_COMMON_PROPERTIES, view),
  ...view.configuration,
});
