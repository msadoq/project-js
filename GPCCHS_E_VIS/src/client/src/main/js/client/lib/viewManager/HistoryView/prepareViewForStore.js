/* eslint-disable quote-props */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
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
    sorting: {
      colName: 'referenceTimestamp',
      direction: 'DESC',
    },
    dataOffset: 0,
    maxDisplayedRows: 1000,
    availableFields: {
      'default': ['referenceTimestamp', 'epName'],
    },
    displayedFields: {
      referenceTimestamp: true,
      epName: true,
    },
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
