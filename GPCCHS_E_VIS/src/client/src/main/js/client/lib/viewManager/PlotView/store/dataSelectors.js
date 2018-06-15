// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Rename dataSelector in dataSelectors .
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 2.0.0 : FA : #7874 : 25/09/2017 : Fixed performance panel and PlotView's dataSelector
//  selector.
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
import _last from 'lodash/last';
import _get from 'lodash/get';
import _ from 'lodash/fp';
import dateFormat from 'viewManager/commonData/date';

import { getViewTitle } from 'store/reducers/views';
import { getPlotViewData, getData } from './dataReducer';

const getFullTitle = getViewTitle;

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`PlotViewConfiguration.${viewId}.entryPoints`, state)
);

const getCount = createSelector(
  getPlotViewData,
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
      const epNames = Object.keys(viewState.lines || {});
      let ptNb = 0;
      for (let j = 0; j < epNames.length; j += 1) {
        // Each line is an array
        ptNb += viewState.indexes[epNames[j]].length;
      }
      count[viewId] = ptNb;
      countAll += ptNb;
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
    if (!viewData) {
      return null;
    }
    const lastTimestamp = _last(_get(viewData, ['indexes', epName]));
    const lastValue = _last(_get(viewData, ['lines', epName]));
    if (!lastTimestamp || !lastValue) {
      return null;
    }
    const timestamp = dateFormat(lastTimestamp);
    const symbol = _get(lastValue, 'symbol');
    const value = (symbol !== undefined && symbol !== null) ? symbol : _get(lastValue, 'value');
    return { timestamp, value };
  }
);


export default {
  getFullTitle,
  getCount,
  getLastValue,
  getEntryPointsByViewId,
};
