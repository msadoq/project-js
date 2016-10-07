import _ from 'lodash';
import getTimeline from './timelines';

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
