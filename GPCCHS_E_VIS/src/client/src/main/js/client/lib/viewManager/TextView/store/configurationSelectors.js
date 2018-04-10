// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
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

export default {
  getViewContent,
};
