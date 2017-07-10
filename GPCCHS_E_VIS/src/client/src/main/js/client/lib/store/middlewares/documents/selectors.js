import _ from 'lodash/fp';
import { createSelector } from 'reselect';

// import { getViews } from '../../reducers/views';
// import { getPages } from '../../reducers/pages';
import { getPageViews } from '../../selectors/pages';

const filterUnsavedViewIds = _.pipe(_.filter('isModified'), _.map(_.get('uuid')));

export const getPageUnsavedViewIds = createSelector(
  getPageViews,
  filterUnsavedViewIds
);

export const getPageHasUnsavedViews = createSelector(
  getPageUnsavedViewIds,
  viewsIds => viewsIds.length > 0
);

const hasNot = _.compose(_.negate, _.has);
const isNewView = _.allPass([hasNot('absolutePath'), hasNot('oId')]);
const filterNewViewIds = _.pipe(_.filter(isNewView), _.map(_.get('uuid')));

export const getPageNewViewIds = createSelector(
  getPageViews,
  filterNewViewIds
);

export const getPageHasNewViews = createSelector(
  getPageNewViewIds,
  viewsIds => viewsIds.length > 0
);
