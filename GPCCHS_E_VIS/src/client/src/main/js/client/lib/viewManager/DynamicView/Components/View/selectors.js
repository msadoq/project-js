// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : move selector from containers to reducers / spectify selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Export const selector in DynamicViewContainer
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : USe new configuration in DynamicView
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { getConfigurationByViewId } from 'viewManager';

const getFormula = (state, ownProps) => {
  const configuration = getConfigurationByViewId(state, ownProps);
  return _.get('entryPoints[0].connectedData.formula', configuration);
};

export default {
  getFormula,
};
