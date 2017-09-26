// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from '../../../viewManager';

const getViewContent = createSelector(
  getConfigurationByViewId,
  _.get('content')
);

export default {
  getViewContent,
};
