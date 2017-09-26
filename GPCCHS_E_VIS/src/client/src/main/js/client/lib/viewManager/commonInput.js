// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Fix commonInput in viewManager .
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Clean configuration (viewManager) . .
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { VM_COMMON_PROPERTIES } from './constants';

const commonPropertiesWithUuid = ['uuid', ...VM_COMMON_PROPERTIES];

// used by all 'prepareViewForStore'
export default view => ({
  ..._.pick(commonPropertiesWithUuid, view),
  configuration: _.omit(commonPropertiesWithUuid, view),
});
