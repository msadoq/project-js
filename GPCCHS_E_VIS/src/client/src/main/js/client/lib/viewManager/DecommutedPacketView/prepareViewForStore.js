// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in
//  viewManager
// VERSION : 2.0.0 : DM : #5806 : 23/10/2017 : Refacto DynamicView configurationReducer . .
// VERSION : 2.0.0 : DM : #5806 : 24/10/2017 : Fix DynamicView setEntryPointDefault and
//  prepareViewForStore
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import _ from 'lodash/fp';

import { moveProp } from 'common/fp';

const singleton = x => [x];

const getDefaultView = _.merge({
  type: 'DecommutedPacketView',
  title: 'New DecommutedPacketView View',
  links: [],
  defaultRatio: { length: 5, width: 5 },
  configuration: {
    entryPoint: {},
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    _.update('entryPoint.id', v4),
    moveProp('entryPoint', 'entryPoints'),
    _.update('entryPoints', singleton)
  ))
);
