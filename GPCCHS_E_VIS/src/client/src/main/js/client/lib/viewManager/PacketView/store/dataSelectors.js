import _ from 'lodash/fp';
import { getViewTitle } from 'store/reducers/views';

const getFullTitle = getViewTitle;

export default {
  getFullTitle,
  getEntryPointsByViewId: (state, { viewId }) => (
    _.get(`PacketViewConfiguration.${viewId}.entryPoints`, state)
  ),
};
