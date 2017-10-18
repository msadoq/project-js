import _ from 'lodash/fp';

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`SkeletonViewConfiguration.${viewId}.entryPoints`, state)
);

export default {
  getEntryPointsByViewId,
};
