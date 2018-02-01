// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'PacketView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Packet View',
  configuration: {
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView
);
