// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Some documentManager fixes . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPageViewsIds simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getModifiedPagesIds simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getEditor simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPageLayout simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Refacto some selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Rename comments about simple/derived selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename somme comments in store/selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Replace selectors/pages/makeGetLayout by getPageLayoutWithCollapsed .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getPageModifiedViewsIds from selectors/pages to menuManager
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix bugs in PlotView/TextView editors
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Check if editors are closed in smartPlay action creator
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Test check editor is closed in smart play action creator
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix bug about playing timebar due to isAnyEditorOpened selector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add SaveAgentModal to ModalGeneric .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Fix bug in getPagesWithViews pages selector
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPage, getPages, getPageViewsIds } from '../reducers/pages';
import { getFocusedWindowPages } from '../selectors/windows';
import { getViews } from '../reducers/views';
import { getWindowFocusedPageId } from '../reducers/windows';

export const getPageViews = createSelector(
  getPageViewsIds,
  getViews,
  (viewIds, views) => _.map(viewId => ({ ...views[viewId], viewId }), viewIds)
);

export const getFocusedPage = createSelector(
  getWindowFocusedPageId,
  getPages,
  _.get
);

export const getFocusedPageId = createSelector(
  getFocusedPage,
  _.get('uuid')
);

export const getPageHasUnsavedViews = createSelector(
  getPageViews,
  _.pipe(
    _.find('isModified'),
    Boolean
  )
);

export const isAnyEditorOpened = createSelector(
  getPages,
  pages => _.reduce((checksum, page) => checksum || (!page.panels.editorIsMinimized), false, pages)
);

export const isAnyEditorOpenedInWindow = createSelector(
  getFocusedWindowPages,
  pages => _.reduce((checksum, page) => checksum || (!page.panels.editorIsMinimized), false, pages)
);

export const isAnyInspectorOpened = createSelector(
  getPages,
  pages =>
    _.reduce((checksum, page) => checksum || (!page.panels.explorerIsMinimized && page.panels.explorerTab === 'inspector'), false, pages)
);

const getPageIdsByViewIds = createSelector(
  getPages,
  (state, { viewIds }) => viewIds,
  (pages, viewIds) => _.pipe(
    _.pickBy(_.pipe(
      _.get('views'),
      _.intersection(viewIds),
      _.get('length'),
      Boolean
    )),
    _.map('uuid')
  )(pages)
);

export const getPageWithViews = createSelector(
  getPage,
  getViews,
  (state, { viewIds }) => viewIds,
  (page, views, viewIds) => ({
    ...page,
    views: _.intersection(viewIds, page.views).map(viewId => views[viewId]),
  })
);

export const getPagesWithViews = (state, { pageIds, viewIds }) => {
  const allPageIds = _.uniq(_.concat(pageIds, getPageIdsByViewIds(state, { viewIds })));
  return allPageIds.map(pageId => getPageWithViews(state, { pageId, viewIds }));
};
