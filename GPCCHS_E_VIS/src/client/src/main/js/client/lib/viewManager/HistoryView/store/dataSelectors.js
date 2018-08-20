import _ from 'lodash/fp';

import { createSelector } from 'reselect';
import { getViewType, getViewTitle } from 'store/reducers/views';
import { getData } from '../../HistoryView/store/dataReducer';

const getFullTitle = getViewTitle;

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`HistoryViewConfiguration.${viewId}.entryPoints`, state)
);

export const getCountBySearching = createSelector(
  state => state,
  (state, { viewId }) => viewId,
  (state, { searching }) => searching,
  getViewType,
  (state, viewId, searching, viewType) =>
    _.getOr([], [`${viewType}Data`, viewId, 'tables', 'history', 'data'], state).filter(data => data.epName && data.epName.indexOf(searching) !== -1).length
);

const getLastValue = createSelector(
  (state, { viewId }) => getData(state, { viewId }),
  (state, { epName }) => epName,
  (viewData, epName) => {
    if (!viewData) {
      return null;
    }

    const lastTimestampIndex = _.get(['last', epName, 'index'], viewData);

    if (!lastTimestampIndex) {
      return null;
    }

    const dataPath = ['tables', 'history', 'data'];

    return {
      timestamp: _.get([...dataPath, lastTimestampIndex, 'referenceTimestamp'], viewData),
      value: _.get([...dataPath, lastTimestampIndex, 'convertedValue'], viewData),
    };
  }
);

export default {
  getFullTitle,
  getCountBySearching,
  getEntryPointsByViewId,
  getLastValue,
};
