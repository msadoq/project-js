import _ from 'lodash';
import formula from './formula';
import localId from './localId';
import domainsFilter from './domains';
import timelinesFilter from './sessions';
import { getTimelines } from '../store/mutations/timebarReducer';

/**
 * Loop on connectedData and apply real domainId and sessionId (with wildcard handling) and return
 * a and de-duplicated list.
 *
 * @param state
 * @param connectedData
 */
export default function decorate(state, connectedData) {
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
          `${p.catalog}.${p.parameterName}.${p.comObject}.${domainId}.${sessionId}.${offset}`;
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
          localId: localId(dataId),
          offset,
          dataId,
        })
      });
    });

    return list;
  }, []);
}
