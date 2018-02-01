import { WS_WORKSPACE_UPDATE_SESSIONNAME, WS_WORKSPACE_UPDATE_DOMAINNAME } from 'store/types';
import { getFocusedWindowId } from 'store/reducers/hsc/index';
import { getWindowFocusedPageSelector } from 'store/selectors/windows';
import { getPageViews } from 'store/selectors/pages';
import { get } from 'common/configurationManager';
import { touchViewConfiguration } from 'store/actions/views';

const windowSessionOrDomainUpdated =
  ({ dispatch, getState }) => next => (action) => {
    // Apply action
    const nextAction = next(action);

    if (
      action.type === WS_WORKSPACE_UPDATE_SESSIONNAME ||
      action.type === WS_WORKSPACE_UPDATE_DOMAINNAME
    ) {
      const wildcardCharacter = get('WILDCARD_CHARACTER');
      const state = getState();
      const windowId = getFocusedWindowId(state);
      const page = getWindowFocusedPageSelector(state, { windowId });
      if (!page) {
        return nextAction;
      }
      if (action.type === WS_WORKSPACE_UPDATE_SESSIONNAME &&
        page.sessionName === wildcardCharacter) {
        const views = getPageViews(state, { pageId: page.uuid });
        views.forEach((view) => {
          if (view.sessionName === wildcardCharacter) {
            dispatch(touchViewConfiguration(view.viewId));
          }
        });
      } else if (action.type === WS_WORKSPACE_UPDATE_DOMAINNAME &&
        page.domainName === wildcardCharacter) {
        const views = getPageViews(state, { pageId: page.uuid });
        views.forEach((view) => {
          if (view.domainName === wildcardCharacter) {
            dispatch(touchViewConfiguration(view.viewId));
          }
        });
      }
    }

    return nextAction;
  };

export default windowSessionOrDomainUpdated;
