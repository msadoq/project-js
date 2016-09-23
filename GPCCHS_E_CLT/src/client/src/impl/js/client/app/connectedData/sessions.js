import _ from 'lodash';
import { detect, generate } from './wildcard';

/**
 * Filter sessions on name and return and an array of ids.
 *
 * @param timelines
 * @param search
 * @returns [int]
 */
export default function filter(timelines, search) {
  if (!timelines || !timelines.length || !search) {
    return [];
  }

  if (!detect(search)) {
    const timeline = _.find(timelines, (v) => v.id === search);
    if (!timeline) {
      return [];
    }
    return [timeline.sessionId];
  }

  const reg = generate(search);
  return _.reduce(timelines, (list, timeline) => {
    return timeline.id && reg.test(timeline.id)
      ? list.concat(timeline.sessionId)
      : list;
  }, []);
}
