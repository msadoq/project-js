import _isUndefined from 'lodash/isUndefined';
import _findIndex from 'lodash/findIndex';
import any from 'lodash/fp/any';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { getDomains } from '../store/reducers/domains';
import { getMasterSessionId } from '../store/reducers/masterSession';
import { getStructureModule, getDataSelectors } from '../viewManager';
import { getTimebarTimelinesSelector } from '../store/selectors/timebars';
import { getView, getViewType } from '../store/reducers/views';
import { getPageDomainName, getPageSessionName, getPageLayout } from '../store/reducers/pages';
import { getDomainName, getSessionName } from '../store/reducers/hsc';
import { getSessions } from '../store/reducers/sessions';

// const logger = getLogger('data:perViewData');

const anyUndefined = any(_isUndefined);

/**
* Get data definitions for a view
* @param state
* @param timebarUuid
* @param viewId
* @param pageId
*/
export default function makeGetPerViewData() {
  return createSelector(
    getMasterSessionId,
    getDomains,
    getTimebarTimelinesSelector,
    (state, { timebarUuid }) => timebarUuid,
    getSessions,
    getView,
    (state, { viewId }) => {
      const type = getViewType(state, { viewId });
      return getDataSelectors(type).getEntryPointsByViewId(state, { viewId });
    },
    (state, { pageId }) => getPageDomainName(state, { pageId }),
    (state, { pageId }) => getPageSessionName(state, { pageId }),
    (state, { pageId }) => getPageLayout(state, { pageId }),
    getDomainName, // in HSC
    getSessionName, // in HSC

    (masterSessionId, domains, viewTimelines, timebarUuid, sessions, view, entryPoints,
    pageDomain, pageSessionName, layout, workspaceDomain, workspaceSessionName) => {
      if (anyUndefined([domains, timebarUuid, viewTimelines, sessions, view, entryPoints])) {
        return {};
      }
      const { type, uuid } = view;
      // Ignore collapsed view
      const index = _findIndex(layout, viewLayout => viewLayout.i === uuid);
      if (index !== -1 && layout[index].collapsed === true) {
        return {};
      }
      return {
        type,
        entryPoints: entryPoints.reduce((acc, ep) => {
          const val =
          getStructureModule(type).parseEntryPoint(
            domains,
            sessions,
            viewTimelines,
            ep,
            masterSessionId,
            timebarUuid,
            type,
            view.domainName,
            pageDomain,
            workspaceDomain,
            view.sessionName,
            pageSessionName,
            workspaceSessionName
          );
          return Object.assign({}, acc, val);
        }, {}
        ),
      };
    });
}
