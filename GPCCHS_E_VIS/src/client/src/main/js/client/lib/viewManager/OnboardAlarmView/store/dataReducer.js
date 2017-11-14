import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import _omit from 'lodash/omit';

import cleanCurrentViewData from './cleanViewData';
import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';

import * as types from '../../../store/types';
import * as constants from '../../constants';

const initialSubState = {
  lines: {},
  indexes: [],
  ackStatus: {},
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function onBoardAlarmViewData(state = initialSubState, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK:
      if (action.payload.view.type !== constants.VM_VIEW_ONBOARDALARM) {
        return state;
      }
      return { ...state, [action.payload.view.uuid]: initialSubState };
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
      {
        const { views } = action.payload;
        if (!views) {
          return state;
        }
        const newState = {};
        views.forEach((view) => {
          if (view.type !== constants.VM_VIEW_ONBOARDALARM) {
            return;
          }
          newState[view.uuid] = initialSubState;
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
    case types.WS_MODAL_OPEN: {
      const { type, viewId, ackId, alarmsOids } = action.payload.props;
      if (type === 'obaAck') {
        return _.set([viewId, 'ackStatus', ackId], {
          acknowledging: false,
          alarmsOids: alarmsOids.map(oid => ({
            oid,
            acknowledged: false,
            ackError: null,
          })),
        }, state);
      }
      return state;
    }
    case types.WS_MODAL_CLOSED: {
      const { type, viewId, ackId } = action.payload.props;
      if (type === 'obaAck') {
        return _.unset([viewId, 'ackStatus', ackId], state);
      }
      return state;
    }
    case types.WS_VIEW_OBA_ALARM_ACK: {
      const { viewId, ackId } = action.payload;
      const newState = _.set([viewId, 'ackStatus', ackId, 'acknowledging'], true, state);
      return newState;
    }
    case types.WS_VIEW_OBA_ALARM_ACK_SUCCESS: {
      const { viewId, ackId, oid } = action.payload;
      if (!state[viewId].ackStatus[ackId]) {
        return state;
      }
      const { alarmsOids } = state[viewId].ackStatus[ackId];
      const iOid = _.findIndex(_.propEq('oid', oid), alarmsOids);
      return _.set([viewId, 'ackStatus', ackId, 'alarmsOids', iOid, 'acknowledged'], true, state);
    }
    case types.WS_VIEW_OBA_ALARM_ACK_FAILURE: {
      const { viewId, ackId, oid, error } = action.payload;
      if (!state[viewId].ackStatus[ackId]) {
        return state;
      }
      const { alarmsOids } = state[viewId].ackStatus[ackId];
      const iOid = _.findIndex(_.propEq('oid', oid), alarmsOids);
      return _.set([viewId, 'ackStatus', ackId, 'alarmsOids', iOid, 'ackError'], String(error), state);
    }
    case types.WS_VIEW_ALARM_COLLAPSE: {
      const { viewId, oid } = action.payload;
      const collapseAlarm = _.set([viewId, 'lines', oid, 'collapsed'], true);
      return collapseAlarm(state);
    }
    case types.WS_VIEW_ALARM_UNCOLLAPSE: {
      const { viewId, oid } = action.payload;
      const uncollapseAlarm = _.set([viewId, 'lines', oid, 'collapsed'], false);
      return uncollapseAlarm(state);
    }
    case types.INJECT_DATA_RANGE: {
      const {
        dataToInject,
        newViewMap,
        newExpectedRangeIntervals,
      } = action.payload;
      if (_.isEmpty(dataToInject)) {
        return state;
      }

      // since now, state will change
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
            epSubState
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
      // since now, state will change
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
          newState = { ...newState, [viewId]: subState || initialSubState };
        }
      }
      return newState;
    }
    default:
      return state;
  }
}

export const getOnboardAlarmViewData = state => state.OnboardAlarmViewData;

export const getData = (state, { viewId }) => state.OnboardAlarmViewData[viewId];

export const getAckStatus = createSelector(
  getData,
  (state, { ackId }) => ackId,
  (data, ackId) => _.get(['ackStatus', ackId], data)
);

export const getDataLines = createSelector(
  getData,
  data => _.flatMap((lineId) => {
    const alarm = data.lines[lineId];
    const alarmWithoutParameters = _.omit('parameters', alarm);
    const parameters = _.isEmpty(alarm.parameters) || alarm.collapsed ? [] : [
      {
        type: 'parameter_header',
        alarm: alarmWithoutParameters,
      },
      ...alarm.parameters.map(parameter => ({
        type: 'parameter',
        data: parameter,
        alarm: alarmWithoutParameters,
      })),
    ];
    return [
      {
        type: 'alarm',
        data: alarmWithoutParameters,
        alarm: alarmWithoutParameters,
      },
      ...parameters,
    ];
  }, data.indexes)
);
