import * as types from '../../../store/types';

export default (stateConf = { domainAlarm: '*', sessionAlarm: '*' }, action) => {
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
      return { ...stateConf, alarmDomain: action.payload.domain };
    case types.WS_VIEW_UPDATE_ALARMTIMELINE:
      return { ...stateConf, alarmTimeline: action.payload.timeline };
    default:
      return stateConf;
  }
};
