// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'DynamicView',
  title: 'New DynamicView View',
  links: [],
  defaultRatio: { length: 5, width: 5 },
  configuration: {
    entryPoint: { connectedData: {} },
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration.entryPoint.id', v4)
);
