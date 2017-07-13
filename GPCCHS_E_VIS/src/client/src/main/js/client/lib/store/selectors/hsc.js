import { getWindowPageIds } from '../reducers/windows';
import { getPage } from '../reducers/pages';
import { getView } from '../reducers/views';

/**
 * Return true if at least one document opened in workspace should be saved
 *
 * @param state
 * @param windowId
 * @returns {boolean}
 */
const getIsSaveNeeded = (state, { windowId }) => {
  const pageIds = getWindowPageIds(state, { windowId }) || [];
  // is there is a page to save?
  let viewIds = [];
  const pageToSave = pageIds.find((pageId) => {
    const page = getPage(state, { pageId });
    if (page && page.views && page.views.length) {
      viewIds = viewIds.concat(page.views);
    }
    return page && !!page.isModified;
  });
  if (typeof pageToSave !== 'undefined') {
    return true;
  }

  // is there is a view to save?
  const viewToSave = viewIds.find((viewId) => {
    const view = getView(state, { viewId });
    return view && !!view.isModified;
  });
  if (typeof viewToSave !== 'undefined') {
    return true;
  }

  // nothing to save in this window
  return false;
};

export default {
  getIsSaveNeeded,
};
