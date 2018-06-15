// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from 'viewManager';

const getViewContent = createSelector(
  getConfigurationByViewId,
  _.get('content')
);

const getViewDimensions = createSelector(
  getConfigurationByViewId,
  _.get('dimensions')
);

export default {
  getViewContent,
  getViewDimensions,
};
