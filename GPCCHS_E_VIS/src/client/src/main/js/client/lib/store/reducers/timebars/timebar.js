import _ from 'lodash/fp';
import u from 'updeep';
import * as types from 'store/types';

const initialState = {
  id: null,
  visuWindow: {
    lower: Date.now() - (12 * 60 * 1000),
    current: Date.now() - (9 * 60 * 1000),
    upper: Date.now() - (6 * 60 * 1000),
    defaultWidth: 720000,
  },
  slideWindow: {
    lower: Date.now() - (11 * 60 * 1000),
    upper: Date.now() - (7 * 60 * 1000),
  },
  rulerStart: Date.now() - (20 * 60 * 1000),
  rulerResolution: 2250,
  speed: 1.0,
  masterId: null,
  mode: 'Normal',
  realTime: false,
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function timebarReducer(stateTimebar = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case types.WS_TIMEBAR_CREATE_NEW: {
      return _.merge(
        initialState,
        {
          id: action.payload.timebarId,
          uuid: action.payload.timebarUuid,
        }
      );
    }
    case types.WS_TIMEBAR_ID_UPDATE:
      return { ...stateTimebar, id: payload.id };
    case types.WS_WORKSPACE_OPENED:
      return _.merge(stateTimebar, action.payload.timebar);
    case types.WS_TIMEBAR_UPDATE_VIEWPORT:
      return {
        ...stateTimebar,
        rulerStart: Math.trunc(payload.rulerStart),
        rulerResolution: payload.rulerResolution,
      };
    case types.WS_TIMEBAR_SPEED_UPDATE:
      return { ...stateTimebar, speed: payload.speed };
    case types.WS_TIMEBAR_MODE_UPDATE:
      return { ...stateTimebar, mode: payload.mode };
    case types.WS_TIMEBAR_MASTERID_UPDATE:
      return { ...stateTimebar, masterId: payload.masterId };
    case types.WS_TIMEBAR_DEFAULTWIDTH_UPDATE:
      return u({
        visuWindow: {
          defaultWidth: parseInt(payload.defaultWidth, 10),
        },
      }, stateTimebar);
    case types.WS_TIMEBAR_SET_REALTIME:
      return { ...stateTimebar, realTime: payload.flag };
    case types.WS_TIMEBAR_UPDATE_CURSORS: {
      const newValues = {};
      const tb = stateTimebar;
      const vw = payload.visuWindow;
      const sw = payload.slideWindow;
      if (vw) {
        if (
          vw.lower !== tb.visuWindow.lower ||
          vw.upper !== tb.visuWindow.upper ||
          vw.current !== tb.visuWindow.current
        ) {
          newValues.visuWindow = {
            lower: Math.trunc(vw.lower || tb.visuWindow.lower),
            upper: Math.trunc(vw.upper || tb.visuWindow.upper),
            current: Math.trunc(vw.current || tb.visuWindow.current),
          };
        }
      }
      if (sw) {
        if (
          sw.lower !== tb.slideWindow.lower ||
          sw.upper !== tb.slideWindow.upper
        ) {
          newValues.slideWindow = {
            lower: Math.trunc(sw.lower || tb.slideWindow.lower),
            upper: Math.trunc(sw.upper || tb.slideWindow.upper),
          };
        }
      }
      if (newValues.slideWindow || newValues.visuWindow) {
        return {
          ...stateTimebar,
          visuWindow: newValues.visuWindow || tb.visuWindow,
          slideWindow: newValues.slideWindow || tb.slideWindow,
        };
      }
      return stateTimebar;
    }
    default:
      return stateTimebar;
  }
}
