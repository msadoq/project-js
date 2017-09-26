// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Improve SaveAgentModal + onClosePage / onSavePage seems to be OK
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add 2 selectors in documents middlewares selectors
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard (documents middleware)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add SaveAgentModal to ModalGeneric .
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Remote unused selector in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --VIEW
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --PAGE
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getViews } from '../../reducers/views';
import { getPages } from '../../reducers/pages';
import { getWindows } from '../../reducers/windows';

import { getWindowPages } from '../../selectors/windows';
import { getPageViews } from '../../selectors/pages';

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
