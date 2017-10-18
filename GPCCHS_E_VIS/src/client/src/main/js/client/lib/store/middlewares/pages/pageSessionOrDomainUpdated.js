import { WS_PAGE_UPDATE_SESSIONNAME, WS_PAGE_UPDATE_DOMAINNAME } from '../../types';
import { getPageViews } from '../../selectors/pages';
import { get } from '../../../common/configurationManager';
import { touchViewConfiguration } from '../../actions/views';

const pageSessionOrDomainUpdated =
  ({ dispatch, getState }) => next => (action) => {
    // Apply action
    const nextAction = next(action);

    if (
      action.type === WS_PAGE_UPDATE_SESSIONNAME ||
      action.type === WS_PAGE_UPDATE_DOMAINNAME
    ) {
      const wildcardCharacter = get('WILDCARD_CHARACTER');
      const state = getState();
      const views = getPageViews(state, { pageId: action.payload.pageId });
      if (action.type === WS_PAGE_UPDATE_SESSIONNAME) {
        views.forEach((view) => {
          if (view.sessionName === wildcardCharacter) {
            dispatch(touchViewConfiguration(view.viewId));
          }
        });
      } else if (action.type === WS_PAGE_UPDATE_DOMAINNAME) {
        views.forEach((view) => {
          if (view.domainName === wildcardCharacter) {
            dispatch(touchViewConfiguration(view.viewId));
          }
        });
      }
    }

    return nextAction;
  };

export default pageSessionOrDomainUpdated;
