// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Add basic SkeletonView . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`SkeletonViewConfiguration.${viewId}.entryPoints`, state)
);

export default {
  getEntryPointsByViewId,
};
