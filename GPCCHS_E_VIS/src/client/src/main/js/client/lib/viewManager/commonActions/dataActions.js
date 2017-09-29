import simple from '../../store/helpers/simpleActionCreator';
import * as types from '../../store/types';
import { getCurrentVisuWindow } from '../../store/selectors/timebars';

export const incomingArchive = simple(types.DATA_INCOMING_ARCHIVE, 'remoteId', 'data');
export const incomingPubSub = simple(types.DATA_INCOMING_PUBSUB, 'remoteId', 'data');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);

export const updateAlarmDomain = simple(types.WS_VIEW_UPDATE_ALARMDOMAIN, 'domainName');
export const updateAlarmTimeline = simple(types.WS_VIEW_UPDATE_ALARMTIMELINE, 'timelineName');
export const updateAlarmMode = mode => (dispatch, getState) => {
  const visuWindow = getCurrentVisuWindow(getState());
  dispatch({ type: types.WS_VIEW_UPDATE_ALARMMODE, payload: { mode, visuWindow } });
};
