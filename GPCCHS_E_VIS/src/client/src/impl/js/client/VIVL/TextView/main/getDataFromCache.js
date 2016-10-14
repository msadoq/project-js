import { reduce, get } from 'lodash';
import { createSelector } from 'reselect';
import getEntryPointsFromState from './getEntryPointsFromState';
import domainsFilter from '../../../lib/common/domains';
import timelinesFilter from '../../../lib/common/sessions';

import formulaParser from '../../../lib/common/formula';
import remoteIdGenerator from '../../../lib/common/remoteId';
import localIdGenerator from '../../../lib/common/localId';

const getDomains = state => state.domains;
const getDataCache = state => state.dataCache;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;

const getTimelinesByTimelineId = createSelector(
  [
    getTimebars,
    getTimelines,
    (state, props) => props.timebarId,
  ],
  (timebars, timelines, timebarId) => {
    const ts = get(timebars, [timebarId, 'timelines']);
    return reduce(ts, (list, timelineId) => {
      const timeline = get(timelines, timelineId);
      if (!timeline || !timeline.id || !timeline.sessionId) {
        return list;
      }

      return list.concat(timeline);
    }, []);
  }
);

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
      getDomains,
      getTimelinesByTimelineId,
      getDataCache,
      (state, props) => props.timebarId,
      (state, props) => props.configuration,
    ],
    (domains, timelines, cache, timebarId, configuration) => {
      return reduce(getEntryPointsFromState(configuration), (list, ep) => {
        if (!ep || !ep.name || !ep.connectedData) {
          return list;
        }

        const cd = ep.connectedData;

        let value;
        const domainIds = domainsFilter(domains, cd.domain);
        const sessionIds = domainIds.length === 1
          ? timelinesFilter(timelines, cd.timeline)
          : [];

        if (!domainIds.length || !sessionIds.length) {
          return list;
        }

        if (domainIds.length > 1 || sessionIds.length > 1) {
          value = 'INVALID';
        } else {
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
          value = get(cache, [remoteId, localId, 'value']);
        }

        return Object.assign(list, { [ep.name]: value });
      }, {});
    }
  );
}
