import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import moment from 'moment';
import _last from 'lodash/last';
import _get from 'lodash/get';

import { getOnboardAlarmViewData, getData } from './dataReducer';
import * as constants from '../../../constants';
import { getViewTitle } from '../../../store/reducers/views';

const MODES_WORDING = {
  [constants.ALARM_MODE_ALL]: 'All',
  [constants.ALARM_MODE_TOACKNOWLEDGE]: 'To Acknowledge',
};

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(['OnboardAlarmViewConfiguration', viewId, 'entryPoints'], state)
);

const getFullTitle = createSelector(
  getViewTitle,
  getEntryPointsByViewId,
  (title, [entryPoint]) => (
    `${title} (${MODES_WORDING[entryPoint.connectedData.mode]})`
  )
);

const getCount = createSelector(
  getOnboardAlarmViewData,
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
      // lines is a table with all alarms
      const ptNb = viewState.lines.length;
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
  (viewData) => {
    if (!viewData) {
      return null;
    }
    // TODO adapt value to viewData
    const lastTimestamp = _last(_get(viewData, ['indexes']));
    const lastValue = _last(_get(viewData, ['lines']));
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
  getEntryPointsByViewId,
  getCount,
  getLastValue,
};
