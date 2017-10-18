import _ from 'lodash/fp';

export default {
  getEntryPointsByViewId: (state, { viewId }) => (
    _.get(`HistoryViewConfiguration.${viewId}.entryPoints`, state)
  ),
};

