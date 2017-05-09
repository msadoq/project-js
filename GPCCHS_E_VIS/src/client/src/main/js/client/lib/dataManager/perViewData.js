import _isUndefined from 'lodash/isUndefined';
import any from 'lodash/fp/any';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { getDomains } from '../store/reducers/domains';
import { getMasterSessionId } from '../store/reducers/masterSession';
import { getSessions } from '../store/reducers/sessions';
import { getTimebarTimelinesSelector } from '../store/selectors/timebars';
import { getView } from '../store/reducers/views';
import { getPageDomainName, getPageSessionName } from '../store/reducers/pages';
import { getDomainName, getSessionName } from '../store/reducers/hsc';
import {
  getStructureModule,
  getConfigurationByViewId,
} from '../viewManager';

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
    getConfigurationByViewId,
    (state, { pageId }) => getPageDomainName(state, { pageId }),
    (state, { pageId }) => getPageSessionName(state, { pageId }),
    getDomainName, // in HSC
    getSessionName, // in HSC
    (masterSessionId, domains, viewTimelines, timebarUuid, sessions, view, configuration,
    pageDomain, pageSessionName, workspaceDomain, workspaceSessionName) => {
      if (anyUndefined([domains, timebarUuid, viewTimelines, sessions, view, configuration])) {
        return {};
      }
      const { type } = view;
      // Ignore collapsed view
      if (configuration.collapsed) {
        return {};
      }
      const { entryPoints } = configuration;
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
