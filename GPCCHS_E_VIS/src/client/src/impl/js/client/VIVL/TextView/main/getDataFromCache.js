import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _set from 'lodash/set';

import { createSelector } from 'reselect';
import domainsFilter from '../../../lib/common/domains';
import timelinesFilter from '../../../lib/common/sessions';

import formulaParser from '../../../lib/common/formula';
import remoteIdGenerator from '../../../lib/common/remoteId';
import localIdGenerator from '../../../lib/common/localId';

const getDomains = state => state.domains;
const getDataCache = state => state.dataCache;

export function makeGetDataMap() {
  /**
   * Establish remoteId/localId map for a given view
   */
  return createSelector(
    [
      getDomains,
      (state, props) => props.timelines,
      (state, props) => props.timebarId,
      (state, props) => props.configuration,
    ],
    (domains, timelines, timebarId, configuration) => {
      console.log('compute text view map');
      return _reduce(_get(configuration, ['entryPoints'], []), (list, ep) => {
        if (!ep || !ep.name || !ep.connectedData) {
          return list;
        }

        const cd = ep.connectedData;

        // domain (only one per entry point for TextView)
        const domainIds = domainsFilter(domains, cd.domain);
        if (!domainIds.length || domainIds.length > 1) {
          return _set(list, [ep.name], { invalid: true, reason: 'domain' });
        }

        // session (only one per entry point for TextView)
        const sessionIds = timelinesFilter(timelines, cd.timeline);
        if (!sessionIds.length || sessionIds.length > 1) {
          return _set(list, [ep.name], { invalid: true, reason: 'session' });
        }

        const { sessionId, offset } = sessionIds[0];

        // TODO : implement a remoteIdGenerator from formula
        const p = formulaParser(cd.formula);
        const dataId = {
          catalog: p.catalog,
          parameterName: p.parameterName,
          comObject: p.comObject,
          domainId: domainIds[0],
          sessionId,
        };
        const remoteId = remoteIdGenerator(dataId, cd.filter);
        const localId = localIdGenerator('TextView', p.field, timebarId, offset);
        return _set(list, [ep.name], { remoteId, localId });
      }, {});
    }
  );
}

export default function getDataFromCache() {
  /**
   * Returns cache data for given view.
   *
   * {
   *   'name': value|'INVALID',
   * }
   *
   * @param state
   * @param configuration
   * @param timebarId
   * @return {*}
   */
  return createSelector(
    [
      makeGetDataMap(),
      getDataCache,
    ],
    (map, cache) => {
      console.log('compute text data');
      return _reduce(map, (list, detail, name) => {
        if (detail.invalid === true) {
          return _set(list, [name], `INVALID (${detail.reason})`);
        }

        const { remoteId, localId } = detail;
        const value = _get(cache, [remoteId, localId, 'value']);
        return _set(list, [name], value);
      }, {});
    });
}
