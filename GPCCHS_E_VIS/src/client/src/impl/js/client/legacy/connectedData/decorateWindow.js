import _ from 'lodash';
import formula from './formula';
import remoteId from './remoteId';
import domainsFilter from './domains';
import timelinesFilter from './sessions';
import { getTimelines } from '../store/selectors/timebars';

/**
 * Loop on connectedData and apply real domainId and sessionId (with wildcard handling) and return
 * a and de-duplicated list.
 *
 * @param state
 * @param connectedData
 */
export default function decorateWindow(state, connectedData) {
  const known = {};
  return _.reduce(connectedData, (list, cd) => {
    const forDomains = domainsFilter(state.domains, cd.domain);
    if (!forDomains.length) {
      return list;
    }
    const forSessionIds = timelinesFilter(getTimelines(state, cd.timebarId), cd.timeline);
    if (!forSessionIds.length) {
      return list;
    }

    _.each(forDomains, (domainId) => {
      _.each(forSessionIds, ({ sessionId, offset }) => {
        const p = formula(cd.formula);

        // de-duplication
        const path =
          `${p.catalog}.${p.parameterName}.${p.comObject}.${domainId}.${sessionId}`;
        if (_.has(known, path)) {
          return;
        }
        _.set(known, path, true);

        const dataId = {
          catalog: p.catalog,
          parameterName: p.parameterName,
          comObject: p.comObject,
          domainId,
          sessionId,
        };

        list.push({
          localId: remoteId(dataId, p.filter), // TODO localId
          offset,
          dataId,
        })
      });
    });

    return list;
  }, []);
}
