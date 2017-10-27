import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import _omit from 'lodash/omit';

import cleanCurrentViewData from './cleanViewData';
import { viewRangeAdd, selectDataPerView, updateLines } from './viewDataUpdate';

import * as types from '../../../store/types';
import * as constants from '../../constants';

const initialState = {
  lines: {},
  indexes: [],
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function groundAlarmViewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK:
      if (action.payload.view.type !== constants.VM_VIEW_GROUNDALARM) {
        return state;
      }
      return { ...state, [action.payload.view.uuid]: initialState };
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
      {
        const { views } = action.payload;
        if (!views) {
          return state;
        }
        const newState = {};
        views.forEach((view) => {
          if (view.type !== constants.VM_VIEW_GROUNDALARM) {
            return;
          }
          newState[view.uuid] = initialState;
        });
        return { ...state, ...newState };
      }
    case types.WS_VIEW_CLOSE: {
      const { viewId } = action.payload;
      if (state[viewId]) {
        return _omit(state, viewId);
      }
      return state;
    }
    case types.WS_PAGE_CLOSE: {
      const { viewIds } = action.payload;
      if (!viewIds.length) {
        return state;
      }
      let newState = state;
      viewIds.forEach((viewId) => {
        if (state[viewId]) {
          newState = _omit(newState, viewId);
        }
      });
      return newState;
    }
    case types.INJECT_DATA_RANGE: {
      const { dataToInject, newViewMap, newExpectedRangeIntervals, configurations, visuWindow }
        = action.payload;
      const dataKeys = Object.keys(dataToInject);
      // If nothing changed and no data to import, return state
      if (!dataKeys.length) {
        return state;
      }
      // Gets configurationfor history views
      const configuration = configurations.GroundAlarmViewConfiguration;

      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        // Data Selection
        const epSubState =
          selectDataPerView(newViewMap[viewId], newExpectedRangeIntervals, dataToInject);
        if (Object.keys(epSubState).length !== 0) {
          // Data injection
          const viewState = viewRangeAdd(
            newState[viewId],
            viewId,
            epSubState,
            _.get([viewId, 'entryPoints', 0, 'connectedData', 'mode'], configuration),
            visuWindow
          );
          if (viewState !== newState[viewId]) {
            newState = { ...newState, [viewId]: viewState };
          }
        }
      }
      return newState || {};
    }
    case types.WS_VIEWDATA_CLEAN: {
      const { previousDataMap, dataMap } = action.payload;
      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        const viewData = state[viewId];

        // Cleaning
        const subState = cleanCurrentViewData(
          viewData,
          previousDataMap.perView[viewId],
          dataMap.perView[viewId],
          previousDataMap.expectedRangeIntervals,
          dataMap.expectedRangeIntervals
        );
        if (subState !== viewData) {
          newState = { ...newState, [viewId]: subState };
        }
      }
      return newState;
    }
    case types.WS_VIEW_UPDATE_ALARMMODE: {
      const { mode, visuWindow, viewId } = action.payload;
      const alarms = state[viewId];
      if (!alarms || !alarms.indexes) {
        return state;
      }
      let newAlarms = _.set('lines', {}, alarms);
      for (let i = 0; i < newAlarms.indexes.length; i += 1) {
        newAlarms = updateLines(newAlarms, alarms.indexes[i], i, mode, visuWindow);
      }
      return _.set(viewId, newAlarms, state);
    }
    default:
      return state;
  }
}

export const getGroundAlarmViewData = state => state.GroundAlarmViewData;

export const getData = (state, { viewId }) => state.GroundAlarmViewData[viewId];

export const getDataLines = createSelector(
  getData,
  data => _.flatMap((lineId) => {
    const alarm = data.lines[lineId];
    const alarmWithoutTransitions = _.omit('transitions', alarm);
    const transitions = _.isEmpty(alarm.transitions) ? [] : [
      {
        type: 'transition_header',
        alarm: alarmWithoutTransitions,
      },
      ...alarm.transitions.map(transition => ({
        type: 'transition',
        data: transition,
        alarm: alarmWithoutTransitions,
      })),
    ];
    return [
      {
        type: 'alarm',
        data: alarmWithoutTransitions,
        alarm: alarmWithoutTransitions,
      },
      ...transitions,
    ];
  }, data.indexes)
);
