
import { createSelector } from 'reselect';

const _ = require('lodash');

// TODO memoized and/or getTimebarWithTimelines as compound selector of getVisibleRemoteIds
export default function getTimebarTimelines(timebars, timelines, timebarId) {
  const timebarTimelines = _.get(timebars, [timebarId, 'timelines']);
  return _.reduce(timebarTimelines, (list, timelineId) => {
    const timeline = _.get(timelines, timelineId);
    if (!timeline || !timeline.id || !timeline.sessionId) {
      return list;
    }

    return list.concat(timeline);
  }, []);
}
