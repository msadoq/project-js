import _ from 'lodash';
/**
 * Selectors
 */
export default function getTimeline(state, timelineId) {
  return _.get(state, `timelines.${timelineId}`);
}
