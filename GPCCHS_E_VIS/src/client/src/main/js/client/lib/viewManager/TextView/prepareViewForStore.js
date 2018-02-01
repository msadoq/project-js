// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Clean configuration (viewManager) . .
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'TextView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Text View',
  configuration: {
    content: '',
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView,
    _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
