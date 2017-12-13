import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getViews } from 'store/reducers/views';
import { getPages } from 'store/reducers/pages';
import { getWindows } from 'store/reducers/windows';

import { getWindowPages } from 'store/selectors/windows';
import { getPageViews } from 'store/selectors/pages';

const filterUnsavedViewIds = _.pipe(_.filter('isModified'), _.map(_.get('uuid')));
const filterUnsavedPageIds = _.pipe(_.filter('isModified'), _.map(_.get('uuid')));

export const getPageUnsavedViewIds = createSelector(
  getPageViews,
  filterUnsavedViewIds
);

export const getPageHasUnsavedViews = createSelector(
  getPageUnsavedViewIds,
  viewsIds => viewsIds.length > 0
);

export const getWorkspaceUnsavedPageIds = createSelector(
  getPages,
  filterUnsavedPageIds
);

const hasNot = _.compose(_.negate, _.has);
const isNewView = _.allPass([hasNot('absolutePath'), hasNot('oId')]);
const isNewPage = _.allPass([hasNot('absolutePath')]);

const filterNewViewIds = _.pipe(_.filter(isNewView), _.map(_.get('uuid')));
const filterNewPagesIds = _.pipe(_.filter(isNewPage), _.map(_.get('uuid')));


export const getPageNewViewIds = createSelector(
  getPageViews,
  filterNewViewIds
);

export const getWorkspaceNewPagesIds = createSelector(
  getPages,
  filterNewPagesIds
);

export const getPageHasNewViews = createSelector(
  getPageNewViewIds,
  viewsIds => viewsIds.length > 0
);

export const getWorkspaceHasNewPages = createSelector(
  getWorkspaceNewPagesIds,
  pagesIds => pagesIds.length > 0
);

export const getNewViewIds = createSelector(
  getViews,
  filterNewViewIds
);

const getPagesByWindowIds = (state, { windowIds }) => (
  _.flatMap(windowId => (
    getWindowPages(state, { windowId })
  ), windowIds)
);

const getViewIdsByWindowIds = createSelector(
  getPagesByWindowIds,
  _.flatMap('views')
);

const getViewsByWindowIds = createSelector(
  getViewIdsByWindowIds,
  getViews,
  _.pick
);

export const getModifiedPageIdsByWindowIds = createSelector(
  getPagesByWindowIds,
  _.pipe(
    _.filter('isModified'),
    _.map('uuid')
  )
);

export const getModifiedViewIdsByWindowIds = createSelector(
  getViewsByWindowIds,
  _.pipe(
    _.filter('isModified'),
    _.map('uuid')
  )
);

// TODO tests
export const getUniqueWindow = createSelector(
  getWindows,
  _.pipe(_.values, _.head)
);

// TODO tests
export const getUniqueWindowId = createSelector(
  getUniqueWindow,
  _.get('uuid')
);
