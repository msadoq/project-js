// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Rename dataSelector in dataSelectors .
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _ from 'lodash/fp';
import dateFormat, { TAI } from 'viewManager/commonData/date';

import { getViewTitle } from 'store/reducers/views';

const getFullTitle = getViewTitle;

export const getTextViewData = state => state.TextViewData;

export const getData = (state, { viewId }) => state.TextViewData[viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`TextViewConfiguration.${viewId}.entryPoints`, state)
);

const getCount = createSelector(
  getTextViewData,
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
