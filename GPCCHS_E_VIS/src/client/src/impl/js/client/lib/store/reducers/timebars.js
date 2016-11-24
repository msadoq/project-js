import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _without from 'lodash/without';
import * as types from '../types';

/**
 * Reducer
 */
export default function timebars(stateTimebars = {}, action) { // TODO test
  const { payload } = action;
  switch (action.type) {
    case types.WS_TIMEBAR_ADD:
      return {
        ...stateTimebars,
        [payload.timebarId]: timebar(undefined, action),
      };
    case types.WS_TIMEBAR_REMOVE:
      return _omit(stateTimebars, [payload.timebarId]);
    case types.WS_TIMEBAR_ID_UPDATE:
    case types.WS_TIMEBAR_VISUWINDOW_UPDATE:
    case types.WS_TIMEBAR_SPEED_UPDATE:
    case types.WS_TIMEBAR_MODE_UPDATE:
    case types.WS_TIMEBAR_PLAYINGSTATE_UPDATE:
    case types.WS_TIMEBAR_MASTERID_UPDATE:
    case types.WS_TIMEBAR_MOUNT_TIMELINE:
    case types.WS_TIMEBAR_UNMOUNT_TIMELINE:
      return {
        ...stateTimebars,
        [payload.timebarId]: timebar(stateTimebars[payload.timebarId], action),
      };
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    default:
      return stateTimebars;
  }
}

const initialState = {
  id: null,
  visuWindow: {
    lower: Date.now() - (12 * 60 * 1000),
    current: Date.now() - (9 * 60 * 1000),
    upper: Date.now() - (6 * 60 * 1000),
  },
  slideWindow: {
    lower: Date.now() - (11 * 60 * 1000),
    upper: Date.now() - (7 * 60 * 1000),
  },
  extUpperBound: Date.now() - (20 * 60 * 1000),
  rulerStart: Date.now() - (20 * 60 * 1000),
  rulerResolution: 2250,
  speed: 1.0,
  playingState: 'pause',
  masterId: null,
  timelines: [],
  mode: 'Normal',
};

function timebar(stateTimebar = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case types.WS_TIMEBAR_ADD: {
      const configuration = _get(action, 'payload.configuration', {});
      return Object.assign({}, stateTimebar, {
        id: configuration.id || initialState.id,
        visuWindow: configuration.visuWindow || initialState.visuWindow,
        slideWindow: configuration.slideWindow || initialState.slideWindow,
        extUpperBound: configuration.extUpperBound || initialState.extUpperBound,
        rulerStart: configuration.rulerStart || initialState.rulerStart,
        rulerResolution: configuration.rulerResolution || initialState.rulerResolution,
        speed: configuration.speed || initialState.speed,
        playingState: configuration.playingState || initialState.playingState,
        masterId: configuration.masterId || initialState.masterId,
        timelines: configuration.timelines || initialState.timelines,
        mode: configuration.mode || initialState.mode,
      });
    }
    case types.WS_TIMEBAR_MOUNT_TIMELINE:
      return { ...stateTimebar, timelines: [...stateTimebar.timelines, payload.timelineId] };
    case types.WS_TIMEBAR_UNMOUNT_TIMELINE:
      return { ...stateTimebar, timelines: _without(stateTimebar.timelines, payload.timelineId) };
    case types.WS_TIMEBAR_ID_UPDATE:
      return { ...stateTimebar, id: payload.id };
    case types.WS_TIMEBAR_VISUWINDOW_UPDATE: {
      let update = {};
      const toUpdate = payload.visuWindowUpdate;
      if (toUpdate.lower && toUpdate.upper && toUpdate.current) {
        update = { visuWindow: {
          lower: toUpdate.lower,
          upper: toUpdate.upper,
          current: toUpdate.current,
        } };
      }

      if (toUpdate.slideWindow) update.slideWindow = toUpdate.slideWindow;
      if (toUpdate.extUpperBound) update.extUpperBound = toUpdate.extUpperBound;
      if (toUpdate.extUpperBound) update.extUpperBound = toUpdate.extUpperBound;

      if (toUpdate.rulerStart) update.rulerStart = toUpdate.rulerStart;
      if (toUpdate.rulerResolution) update.rulerResolution = toUpdate.rulerResolution;

      return { ...stateTimebar, ...update };
    }
    case types.WS_TIMEBAR_SPEED_UPDATE:
      return { ...stateTimebar, speed: payload.speed };
    case types.WS_TIMEBAR_MODE_UPDATE:
      return { ...stateTimebar, mode: payload.mode };
    case types.WS_TIMEBAR_PLAYINGSTATE_UPDATE:
      return { ...stateTimebar, playingState: payload.playingState };
    case types.WS_TIMEBAR_MASTERID_UPDATE:
      return { ...stateTimebar, masterId: payload.masterId };
    default:
      return stateTimebar;
  }
}
