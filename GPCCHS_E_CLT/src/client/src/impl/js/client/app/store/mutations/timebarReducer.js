import _ from 'lodash';
import * as types from './types';
import { getTimeline } from './timelineReducer';

/**
 * Reducer
 */
export default function timebars(stateTimebars = {}, action) { // TODO test
  switch (action.type) {
    case types.WS_TIMEBAR_ADD:
      return {
        ...stateTimebars,
        [action.payload.timebarId]: timebar(undefined, action),
      };
    case types.WS_TIMEBAR_REMOVE:
      return _.omit(stateTimebars, [action.payload.timebarId]);
    case types.WS_TIMEBAR_ID_UPDATE:
    case types.WS_TIMEBAR_VISUWINDOW_UPDATE:
    case types.WS_TIMEBAR_SPEED_UPDATE:
    case types.WS_TIMEBAR_PLAYINGSTATE_UPDATE:
    case types.WS_TIMEBAR_MASTERID_UPDATE:
    case types.WS_TIMEBAR_MOUNT_TIMELINE:
    case types.WS_TIMEBAR_UNMOUNT_TIMELINE:
      return {
        ...stateTimebars,
        [action.payload.timebarId]: timebar(stateTimebars[action.payload.timebarId], action),
      };
    default:
      return stateTimebars;
  }
}

const initialState = {
  id: null,
  visuWindow: {},
  slideWindow: {},
  extUpperBound: Date.now() - (20 * 60 * 1000),
  rulerStart: Date.now() - (20 * 60 * 1000),
  rulerResolution: 11250,
  speed: 1.0,
  playingState: 'pause',
  masterId: null,
  timelines: [],
};

function timebar(stateTimebar = initialState, action) {
  switch (action.type) {
    case types.WS_TIMEBAR_ADD: {
      const configuration = _.get(action, 'payload.configuration', {});
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
      });
    }
    case types.WS_TIMEBAR_MOUNT_TIMELINE:
      return Object.assign({}, stateTimebar,
        { timelines: [...stateTimebar.timelines, action.payload.timelineId] });
    case types.WS_TIMEBAR_UNMOUNT_TIMELINE:
      return Object.assign({}, stateTimebar,
        { timelines: _.without(stateTimebar.timelines, action.payload.timelineId) });
    case types.WS_TIMEBAR_ID_UPDATE:
      return Object.assign({}, stateTimebar, { id: action.payload.id });
    case types.WS_TIMEBAR_VISUWINDOW_UPDATE:
      return Object.assign({}, stateTimebar, { visuWindow: {
        lower: action.payload.lower,
        upper: action.payload.upper,
        current: action.payload.current,
      } });
    case types.WS_TIMEBAR_SPEED_UPDATE:
      return Object.assign({}, stateTimebar, { speed: action.payload.speed });
    case types.WS_TIMEBAR_PLAYINGSTATE_UPDATE:
      return Object.assign({}, stateTimebar, { playingState: action.payload.playingState });
    case types.WS_TIMEBAR_MASTERID_UPDATE:
      return Object.assign({}, stateTimebar, { masterId: action.payload.masterId });
    default:
      return stateTimebar;
  }
}

/**
* Selectors
 */
export function getTimebar(state, timebarId) { // TODO test
  return _.get(state, `timebars.${timebarId}`);
}

export function getMasterTimeline(state, timebarId) { // TODO test
  const { masterId } = getTimebar(state, timebarId);
  const timelines = getTimelines(state, timebarId);
  return _.find(timelines, timeline => timeline.id === masterId);
}

export function getTimelines(state, timebarId) { // TODO test
  const timelines = _.get(state, `timebars.${timebarId}.timelines`, []);
  return _.reduce(timelines, (list, timelineId) => {
    const timeline = getTimeline(state, timelineId);
    return timeline
      ? list.concat(timeline)
      : list;
  }, []);
}
