// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Add basic SkeletonView . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'SkeletonView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Skeleton View',
  configuration: {
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView
);
