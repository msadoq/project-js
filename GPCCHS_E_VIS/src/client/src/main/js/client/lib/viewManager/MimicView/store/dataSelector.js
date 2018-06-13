// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Fix tests on mimic view
// VERSION : 1.1.2 : DM : #5822 : 21/06/2017 : add context menu in mimiv view to open entry points
//  in inspector
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 10/11/2017 : Add getFullTitle selectors in each view
//  (viewManager)
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2949 : 22/03/2018 : dates now display in TAI
// VERSION : 2.0.0 : FA : ISIS-FT-2949 : 22/03/2018 : dataSelectors date must not be convert into
//  TAI
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _ from 'lodash/fp';
import dateFormat from 'viewManager/commonData/date';
import { getViewTitle } from 'store/reducers/views';
import { getMimicViewData, getData } from './dataReducer';

const getFullTitle = getViewTitle;

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`MimicViewConfiguration.${viewId}.entryPoints`, state)
);

const getCount = createSelector(
  getMimicViewData,
  (dataState) => {
    if (!dataState || !Object.keys(dataState).length) {
      return { all: 0 };
    }
    const viewIds = Object.keys(dataState || {});
    const count = {};
    let countAll = 0;
    // Loop on views
    for (let i = 0; i < viewIds.length; i += 1) {
      const viewId = viewIds[i];
      const viewState = dataState[viewId];
      count[viewId] = Object.keys(viewState.index || {}).length;
      countAll += count[viewId];
    }
    // Add all
    count.all = countAll;
    return count;
  }
);

const getLastValue = createSelector(
  (state, { viewId }) => getData(state, { viewId }),
  (state, { epName }) => epName,
  (viewData, epName) => {
    const lastTimestamp = _get(viewData, ['index', epName]);
    const value = _get(viewData, ['values', epName, 'value']);
    if (_isNil(lastTimestamp) || _isNil(value)) {
      return null;
    }
    const timestamp = dateFormat(lastTimestamp);
    return { timestamp, value };
  }
);

export default {
  getFullTitle,
  getCount,
  getLastValue,
  getEntryPointsByViewId,
};
