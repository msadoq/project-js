// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : move getMasterSessionId selector from selectors to
//  reducers
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/domains . . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in
//  store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : remove unused masterSessionId from perViewData
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : fix datamap for collapsed view add filter on mimic
//  entry point fix computation of missing last interval Add filter on tbdId computation for plot
//  view
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _isUndefined from 'lodash/isUndefined';
import _findIndex from 'lodash/findIndex';
import any from 'lodash/fp/any';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { get } from 'common/configurationManager';
import { getDomains } from '../store/reducers/domains';
import { getStructureModule, getDataSelectors } from '../viewManager';
import { getTimebarTimelinesSelector } from '../store/selectors/timebars';
import { getView, getViewType } from '../store/reducers/views';
import { getPageDomainName, getPageSessionName, getPageLayout } from '../store/reducers/pages';
import { getDomainName, getSessionName } from '../store/reducers/hsc';
import { getSessions } from '../store/reducers/sessions';
import { getTimebarMasterId } from '../store/reducers/timebars';
import { getCurrentSession } from '../store/selectors/sessions';

// const logger = getLogger('data:perViewData');

const anyUndefined = any(_isUndefined);

const WILDCARD = get('WILDCARD_CHARACTER');

function matchesSession(masterSession, element) {
  return !element // considered as wildcard
    || element === WILDCARD
    || element === masterSession;
}

function filterBySession(
  masterSessionName,
  timelines,
  viewSessionName,
  pageSessionName,
  workspaceSessionName,
  entryPoints
) {
  const sessionNamesByTimelineId = timelines.reduce((aggregator, t) => ({
    ...aggregator,
    [t.id]: t.sessionName,
  }), {});
  const areIntermediateMatchingMasterSession =
    matchesSession(masterSessionName, viewSessionName)
    && matchesSession(masterSessionName, pageSessionName)
    && matchesSession(masterSessionName, workspaceSessionName)
  ;

  return !areIntermediateMatchingMasterSession
    ? []
    : entryPoints.filter(e =>
      sessionNamesByTimelineId[e.connectedData.timeline] === masterSessionName
      || e.connectedData.timeline === WILDCARD
    );
}

/**
 * Get data definitions for a view
 * @returns {*}
 */
export default function makeGetPerViewData() {
  return createSelector(
    // FIXME: I think it could be removed since filterBySession should use getCurrentSession
    getTimebarMasterId,
    getCurrentSession,
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

    (masterTimeBarID, masterTimelineSession, domains, viewTimelines, timebarUuid, sessions, view,
     entryPoints, pageDomain, pageSessionName, layout, workspaceDomain, workspaceSessionName) => {
      if (anyUndefined([domains, timebarUuid, viewTimelines, sessions, view, entryPoints])) {
        return {};
      }
      const { type, uuid } = view;
      // Ignore collapsed view
      const index = _findIndex(layout, viewLayout => viewLayout.i === uuid);
      if (index !== -1 && layout[index].collapsed === true) {
        return {};
      }

      const masterTimeBarSession = viewTimelines.find(s => s.id === masterTimeBarID);
      const entryPointsFilteredBySession = masterTimeBarSession ? filterBySession(
        masterTimeBarSession.sessionName,
        viewTimelines,
        view.sessionName,
        pageSessionName,
        workspaceSessionName,
        entryPoints
      )
      : [];

      return {
        type,
        entryPoints: entryPointsFilteredBySession.reduce((acc, ep) => {
          const val =
          getStructureModule(type).parseEntryPoint(
            domains,
            sessions,
            viewTimelines,
            ep,
            masterTimelineSession,
            timebarUuid,
            type,
            view.domainName,
            pageDomain,
            workspaceDomain,
            view.sessionName,
            pageSessionName,
            workspaceSessionName
          );
          return {
            ...acc, ...val,
          };
        }, {}
        ),
      };
    });
}
