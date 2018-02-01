// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : move getMasterSessionId selector from selectors to reducers
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/domains . . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : remove unused masterSessionId from perViewData
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : fix datamap for collapsed view add filter on mimic entry point fix computation of missing last interval Add filter on tbdId computation for plot view
// END-HISTORY
// ====================================================================

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
