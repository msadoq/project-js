import _ from 'lodash/fp';

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`DynamicViewConfiguration.${viewId}.entryPoints`, state)
);

const getLastValue = () => null;

export default {
  getEntryPointsByViewId,
  getLastValue,
};
