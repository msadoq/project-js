import _ from 'lodash';
import * as types from './types';
import { getTimeline } from './timelineReducer';

/**
 * Reducer
 */
export default function timebars(state = {}, action) { // TODO test
  switch (action.type) {
    case types.WS_TIMEBAR_ADD:
      return {
        ...state,
        [action.payload.timebarId]: timebar(undefined, action),
      };
    case types.WS_TIMEBAR_REMOVE:
      return _.omit(state, [action.payload.timebarId]);
    default:
      return state;
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

function timebar(state = initialState, action) { // TODO test
  switch (action.type) {
    case types.WS_TIMEBAR_ADD: {
      const configuration = _.get(action, 'payload.configuration', {});
      return Object.assign({}, state, {
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
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getTimebar(state, timebarId) { // TODO test
  return _.get(state, `timebars.${timebarId}`);
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
