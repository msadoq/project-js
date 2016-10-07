import _ from 'lodash';

/**
 * Extract timebars and corresponding timelines for VIMA sending
 * @param state
 * @return {Array}
 */
export default function convertFromStore(state) {
  return _.map(state.timebars, (storeTimebar) => {
    const timebar = _.cloneDeep(storeTimebar);
    timebar.timelines =
      _.map(storeTimebar.timelines, (timelineId) => _.cloneDeep(state.timelines[timelineId]));
    return timebar;
  });
}
