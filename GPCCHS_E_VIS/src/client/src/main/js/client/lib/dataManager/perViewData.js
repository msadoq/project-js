import _isUndefined from 'lodash/isUndefined';
import any from 'lodash/fp/any';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { getDomains } from '../store/reducers/domains';
import { getMasterSessionId } from '../store/reducers/masterSession';
import { getSessions } from '../store/reducers/sessions';
import { getTimebarTimelinesSelector } from '../store/selectors/timebars';
import { getView } from '../store/reducers/views';
import { getStructureType, getStructureModule } from '../viewManager';

// const logger = getLogger('data:perViewData');

const anyUndefined = any(_isUndefined);

/**
* Get data definitions for a view
* @param state
* @param timebarUuid
* @param viewId
*/
export default function makeGetPerViewData() {
  return createSelector(
    getMasterSessionId,
    getDomains,
    getTimebarTimelinesSelector,
    getView,
    (state, { timebarUuid }) => timebarUuid,
    getSessions,
    (masterSessionId, domains, viewTimelines, view, timebarUuid, sessions) => {
      if (anyUndefined([domains, view, timebarUuid, viewTimelines, sessions])) {
        return {};
      }
      const { configuration, type } = view;
      // Ignore collapsed view
      if (configuration.collapsed) {
        return {};
      }
      const { entryPoints } = configuration;
      const structureType = getStructureType(type);

      return {
        type,
        masterSessionId,
        structureType,
        entryPoints: entryPoints.reduce((acc, ep) => {
          const val =
          getStructureModule(type).parseEntryPoint(
            domains,
            sessions,
            viewTimelines,
            ep,
            masterSessionId,
            timebarUuid,
            type
          );
          return Object.assign({}, acc, val);
        }, {}
        ),
      };
    });
}
