import _ from 'lodash';
import formula from '../../app/connectedData/formula';
import remoteIdGenerator from '../../app/connectedData/remoteId';
import localIdGenerator from '../../app/connectedData/localId';
import domainsFilter from '../../app/connectedData/domains';
import timelinesFilter from '../../app/connectedData/sessions';
import { getTimelines } from '../../app/store/mutations/timebarReducer';

/**
 * Loop on connectedData and apply real domainId and sessionId (with wildcard handling) and return
 * a and de-duplicated list.
 *
 * @param state
 * @param connectedData
 */
export default function decorate(state, connectedData) {
  // const known = {};
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
        if (typeof list[remoteId] === 'undefined') {
          list[remoteId] = {
            dataId: dataId,
            filter: p.filter,
            localIds: {},
          };
        } else if (typeof list[remoteId][localId] !== 'undefined') {
          return;
        }

        list[remoteId].localIds[localId] = {
          viewType: cd.viewType,
          field: p.field,
          offset,
        };
      });
    });

    return list;
  }, {});
}
