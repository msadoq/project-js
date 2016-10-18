import { reduce, get, set } from 'lodash';
import { createSelector } from 'reselect';
import getEntryPointsFromState from './getEntryPointsFromState';
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
      console.log('compute view map');
      return reduce(getEntryPointsFromState(configuration), (list, ep) => {
        if (!ep || !ep.name || !ep.connectedData) {
          return list;
        }

        const cd = ep.connectedData;

        // domain (only one per entry point for TextView)
        const domainIds = domainsFilter(domains, cd.domain);
        if (!domainIds.length || domainIds.length > 1) {
          return set(list, [ep.name], { invalid: true, reason: 'domain' });
        }

        // session (only one per entry point for TextView)
        const sessionIds = timelinesFilter(timelines, cd.timeline);
        if (!sessionIds.length || sessionIds.length > 1) {
          return set(list, [ep.name], { invalid: true, reason: 'session' });
        }

        const { sessionId, offset } = sessionIds[0];
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
        return set(list, [ep.name], { remoteId, localId });
      }, {});
    }
  );
}

export default function getDataFromCache() {
  /**
   * Returns cache data for given view.
   *
   * {
   *   'name': value|'invalid',
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
      console.log('compute data');
      return reduce(map, (list, detail, name) => {
        if (detail.invalid === true) {
          return set(list, [name], detail);
        }

        const { remoteId, localId } = detail;
        const value = get(cache, [remoteId, localId, 'value']);
        return set(list, [name], value);
      }, {});
    });
}
