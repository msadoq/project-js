import _find from 'lodash/find';
import _get from 'lodash/get';
import { getTimeline } from './timelines';

/**
* Selectors
 */
export const getTimebar = (state, timebarId) => state.timebars[timebarId];

export function getTimebarById(state, timebarId) { // TODO test
  return _find(state.timebars, tb => tb.id === timebarId);
}

export function getMasterTimeline(state, timebarId) { // TODO test
  const { masterId } = getTimebar(state, timebarId);
  const timelines = getTimelines(state, timebarId);
  return _find(timelines, timeline => timeline.id === masterId);
}

export function getTimelines(state, timebarId) { // TODO test
  const timelines = _get(state, `timebars.${timebarId}.timelines`, []);
  return timelines.reduce((list, timelineId) => {
    const timeline = getTimeline(state, timelineId);
    return timeline
      ? list.concat(timeline)
      : list;
  }, []);
}

export function getTimelinesFromTimebar(state, timebar) { // TODO test
  const timelines = timebar ? timebar.timelines : [];
  return timelines.reduce((list, timelineId) => {
    const timeline = getTimeline(state, timelineId);
    return timeline
      ? list.concat(timeline)
      : list;
  }, []);
}
