import _ from 'lodash/fp';

export default {
  getEntryPointsByViewId: (state, { viewId }) => (
    _.get(`PacketViewConfiguration.${viewId}.entryPoints`, state)
  ),
};

