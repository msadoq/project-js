// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Add lint rule on selector signatures
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Add getIsWorkspaceOpening selector in project
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove useless workspaceOpened in state.hsc
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : FA : #7081 : 27/06/2017 : Fix crash while closing application with document to save (a merge was probably deleted some code)
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix store broken test due to selectors/hsc export
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Lint fix . . . .
// END-HISTORY
// ====================================================================

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
