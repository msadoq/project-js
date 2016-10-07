import _ from 'lodash';
import formula from './formula';
import remoteIdGenerator from './remoteId';
import localIdGenerator from './localId';
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
export default function decorate(state, connectedData) {
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
        // remoteId
        const p = formula(cd.formula);
        const dataId = {
          catalog: p.catalog,
          parameterName: p.parameterName,
          comObject: p.comObject,
          domainId,
          sessionId,
        };
        const remoteId = remoteIdGenerator(dataId, p.filter);

        // localId
        const localId = localIdGenerator(cd.viewType, p.field, offset);

        // de-duplication
        if (!list[remoteId]) {
          list[remoteId] = { localIds: {} }; // eslint-disable-line no-param-reassign
        } else if (list[remoteId].localIds[localId]) {
          return;
        }

        list[remoteId].localIds[localId] = { // eslint-disable-line no-param-reassign
          viewType: cd.viewType,
          field: p.field,
          offset,
          dataId,
        };
      });
    });

    return list;
  }, {});
}
