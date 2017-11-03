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
    type: 'obaAck',
    title: 'On Board Alarm',
    ackId,
    viewId,
    alarmsTimestamps,
  });
};

export const sendAlarmAck = (alarms, comment) => ({
  type: types.WS_VIEW_OBA_ALARM_ACK,
  payload: {
    alarmsTimestamps: _.isArray(alarms) ? alarms : [alarms],
    comment,
  },
});
