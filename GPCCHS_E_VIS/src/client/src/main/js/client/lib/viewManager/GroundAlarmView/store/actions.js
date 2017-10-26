import _ from 'lodash/fp';
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

export const openAckModal = alarms => (
  openModalInCurrentWindow({ type: 'alarmAck', title: 'Ground Monitoring Alarm', alarms })
);

export const sendAlarmAck = (alarms, reason) => ({
  type: types.WS_VIEW_GMA_ALARM_ACK,
  payload: {
    alarms: _.isArray(alarms) ? alarms : [alarms],
    reason,
  },
});
