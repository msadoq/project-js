import _ from 'lodash/fp';
import { v4 } from 'uuid';
import simple from '../../../store/helpers/simpleActionCreator';
import * as types from '../../../store/types';
import { getCurrentVisuWindow } from '../../../store/selectors/timebars';
import { openInCurrentWindow as openModalInCurrentWindow } from '../../../store/actions/modals';

export const updateAlarmDomain = simple(types.WS_VIEW_UPDATE_ALARMDOMAIN, 'viewId', 'domainName');
export const updateAlarmTimeline = simple(types.WS_VIEW_UPDATE_ALARMTIMELINE, 'viewId', 'timelineName');
export const updateAlarmMode = (viewId, mode) => (dispatch, getState) => {
  const visuWindow = getCurrentVisuWindow(getState());
  dispatch({ type: types.WS_VIEW_UPDATE_ALARMMODE, payload: { viewId, mode, visuWindow } });
};

export const openAckModal = (viewId, alarmsOids) => {
  const ackId = v4();
  return openModalInCurrentWindow({
    type: 'gmaAck',
    title: 'Ground Monitoring Alarm',
    ackId,
    viewId,
    alarmsOids,
  });
};

export const sendAlarmAck = (viewId, ackId, alarms, comment) => ({
  type: types.WS_VIEW_GMA_ALARM_ACK,
  payload: {
    viewId,
    ackId,
    alarms: _.isArray(alarms) ? alarms : [alarms],
    comment,
  },
});

export const ackSuccess = (viewId, ackId, oid) => ({
  type: types.WS_VIEW_GMA_ALARM_ACK_SUCCESS,
  payload: {
    viewId,
    ackId,
    oid,
  },
});

export const ackFailure = (viewId, ackId, oid, error = '') => ({
  type: types.WS_VIEW_GMA_ALARM_ACK_FAILURE,
  payload: {
    viewId,
    ackId,
    oid,
    error,
  },
});

export const toggleSelection = (viewId, oid) => ({
  type: types.WS_VIEW_ALARM_TOGGLE_SELECTION,
  payload: {
    viewId,
    oid,
  },
});

export const toggleSort = (viewId, column) => ({
  type: types.WS_VIEW_ALARM_TOGGLE_SORT,
  payload: {
    viewId,
    column,
  },
});

export const collapseAlarm = (viewId, oid) => ({
  type: types.WS_VIEW_ALARM_COLLAPSE,
  payload: { viewId, oid },
});

export const uncollapseAlarm = (viewId, oid) => ({
  type: types.WS_VIEW_ALARM_UNCOLLAPSE,
  payload: { viewId, oid },
});
