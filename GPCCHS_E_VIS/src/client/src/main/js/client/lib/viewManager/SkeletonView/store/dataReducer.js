// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Add basic SkeletonView . .
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`SkeletonViewConfiguration.${viewId}.entryPoints`, state)
);

export default {
  getEntryPointsByViewId,
};
