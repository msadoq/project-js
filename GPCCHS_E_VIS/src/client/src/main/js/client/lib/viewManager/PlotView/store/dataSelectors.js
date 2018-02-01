// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Rename dataSelector in dataSelectors .
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import moment from 'moment';
import _last from 'lodash/last';
import _get from 'lodash/get';
import _ from 'lodash/fp';

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
    const timestamp = moment(lastTimestamp).utc().toISOString();
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
