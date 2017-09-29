import * as types from '../../../store/types';

// domainAlarm: '*', sessionAlarm: '*'
export default (stateConf = {}, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      const config = action.payload.view.configuration;
      return config;
    }
    case types.WS_VIEW_UPDATE_ALARMDOMAIN:
      return { ...stateConf, alarmDomain: action.payload.domainName };
    case types.WS_VIEW_UPDATE_ALARMTIMELINE:
      return { ...stateConf, alarmTimeline: action.payload.timelineName };
    case types.WS_VIEW_UPDATE_ALARMMODE:
      return { ...stateConf, alarmMode: action.payload.mode };
    default:
      return stateConf;
  }
};

export const getAlarmDomain = (state, { viewId }) =>
  state.GroundAlarmViewConfiguration[viewId].alarmDomain;

export const getAlarmTimeline = (state, { viewId }) =>
  state.GroundAlarmViewConfiguration[viewId].alarmTimeline;
