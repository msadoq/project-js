import { reduce } from 'lodash';
import { createSelector } from 'reselect';

import vivl from '../../../VIVL/main';
import decline from './decline';

const getDomains = state => state.domains;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;
const getWindows = state => state.windows;
const getPages = state => state.pages;
const getViews = state => state.views;

const getWindowsFocusedPageIds = createSelector(
  [getWindows],
  windows => reduce(windows, (list, w) => {
    if (!w.focusedPage) {
      return list;
    }

    return list.concat(w.focusedPage);
  }, [])
);

const getWindowsFocusedPage = createSelector(
  [getWindowsFocusedPageIds, getPages],
  (pageIds, pages) => reduce(pageIds, (list, pageId) => {
    if (!pages[pageId]) {
      return list;
    }

    return list.concat(pages[pageId]);
  }, [])
);

const getWindowsVisibleViewIds = createSelector(
  [getWindowsFocusedPage],
  pages => reduce(pages, (list, page) => {
    if (!page.views || !page.views.length) {
      return list;
    }
    if (!page.timebarId) {
      return list;
    }

    return list.concat({ timebarId: page.timebarId, viewIds: page.views });
  }, [])
);

const getWindowsVisibleViews = createSelector(
  [getWindowsVisibleViewIds, getViews],
  (pages, views) => reduce(pages, (list, { timebarId, viewIds }) => reduce(viewIds, (l, viewId) => {
    if (!views[viewId]) {
      return l;
    }

    return l.concat({ viewId, timebarId, viewData: views[viewId] });
  }, []), [])
);

const getVisibleConnectedData = createSelector(
  [getWindowsVisibleViews],
  views => reduce(views, (list, view) => {
    if (!view.viewData) {
      return list;
    }

    const { timebarId } = view;
    const { type, configuration } = view.viewData;
    if (!configuration) {
      return list;
    }

    const connectedData = vivl(type, 'getConnectedDataFromState')(configuration);
    if (!connectedData) {
      return list;
    }
    return list.concat({ type, timebarId, connectedData });
  }, [])
);

// TODO memoize formula parsing (formula)
// TODO memoize domains search (redux domains, search)
// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
export default createSelector(
  [getDomains, getTimebars, getTimelines, getVisibleConnectedData],
  (domains, timebars, timelines, cds) => decline(domains, timebars, timelines, cds)
  // TODO : first establish map(windows, pages, views, domains, /!\ timelines) (memoized until configuration modification)
  // TODO : timelines stored directly on timebars.timelines to compare directly the array ref?
  // TODO : then establish intervals(map, timebars) (memoized until visuWindow modification)
);
