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

export const openAckModal = (viewId, alarmsTimestamps) => {
  const ackId = v4();
  return openModalInCurrentWindow({
    type: 'gmaAck',
    title: 'Ground Monitoring Alarm',
    ackId,
    viewId,
    alarmsTimestamps,
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

export const ackSuccess = (viewId, ackId, timestamp) => ({
  type: types.WS_VIEW_GMA_ALARM_ACK_SUCCESS,
  payload: {
    viewId,
    ackId,
    timestamp,
  },
});

export const ackFailure = (viewId, ackId, timestamp) => ({
  type: types.WS_VIEW_GMA_ALARM_ACK_FAILURE,
  payload: {
    viewId,
    ackId,
    timestamp,
  },
});
