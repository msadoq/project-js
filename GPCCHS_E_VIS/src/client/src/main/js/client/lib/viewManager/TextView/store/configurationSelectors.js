import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from '../../../viewManager';

const getViewContent = createSelector(
  getConfigurationByViewId,
  _.get('content')
);

export default {
  getViewContent,
};
