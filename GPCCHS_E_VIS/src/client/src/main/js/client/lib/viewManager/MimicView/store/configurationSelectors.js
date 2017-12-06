import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from 'viewManager';

const getViewContent = createSelector(
  getConfigurationByViewId,
  _.get('content')
);

const getViewDimensions = createSelector(
  getConfigurationByViewId,
  _.get('dimensions')
);

export default {
  getViewContent,
  getViewDimensions,
};
