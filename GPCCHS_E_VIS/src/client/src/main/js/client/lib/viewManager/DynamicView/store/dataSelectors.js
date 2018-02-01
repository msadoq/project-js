// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
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
