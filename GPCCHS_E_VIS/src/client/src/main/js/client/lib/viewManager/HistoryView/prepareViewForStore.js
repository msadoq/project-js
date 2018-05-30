/* eslint-disable quote-props */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { v4 } from 'uuid';

const getDefaultView = _.merge({
  type: 'HistoryView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New History View',
  configuration: {
    entryPoints: [],
    tables: {
      history: {
        name: 'Entry points history',
        sorting: {
          colName: 'referenceTimestamp',
          direction: 'DESC',
        },
        cols: [
          { title: 'referenceTimestamp', displayed: true, group: 'default', position: 0 },
          { title: 'epName', displayed: true, group: 'default', position: 1 },
        ],
      },
    },
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
