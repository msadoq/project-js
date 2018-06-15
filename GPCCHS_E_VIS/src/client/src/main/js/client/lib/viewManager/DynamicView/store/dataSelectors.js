// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 10/11/2017 : Add getFullTitle selectors in each view
//  (viewManager)
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import { getViewTitle } from 'store/reducers/views';

const getFullTitle = getViewTitle;

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`DynamicViewConfiguration.${viewId}.entryPoints`, state)
);

const getLastValue = () => null;

export default {
  getFullTitle,
  getEntryPointsByViewId,
  getLastValue,
};
