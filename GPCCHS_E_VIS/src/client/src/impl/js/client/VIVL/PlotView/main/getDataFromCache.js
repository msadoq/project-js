import _reduce from 'lodash/reduce';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';
import _map from 'lodash/map';
import { createSelector } from 'reselect';
import getEntryPointsFromState from './getEntryPointsFromState';
import domainsFilter from '../../../lib/common/domains';
import timelinesFilter from '../../../lib/common/sessions';

import formulaParser from '../../../lib/common/formula';
import remoteIdGenerator from '../../../lib/common/remoteId';
import localIdGenerator from '../../../lib/common/localId';

const getDomains = state => state.domains;
const getDataCache = state => state.dataCache;

function mapAxe(domains, timelines, timebarId, cd) {
  const list = [];

  // domains (at least one)
  const domainIds = domainsFilter(domains, cd.domain);
  if (!domainIds.length) {
    return list;
  }

  // sessions (at least one)
  const sessionIds = timelinesFilter(timelines, cd.timeline);
  if (!sessionIds.length) {
    return list;
  }

  _each(domainIds, (domainId) => {
    _each(sessionIds, ({ sessionId, offset }) => {
      // TODO : implement a remoteIdGenerator from formula
      const p = formulaParser(cd.formula);
      const dataId = {
        catalog: p.catalog,
        parameterName: p.parameterName,
        comObject: p.comObject,
        domainId,
        sessionId,
      };
      const remoteId = remoteIdGenerator(dataId, cd.filter);
      const localId = localIdGenerator('PlotView', p.field, timebarId, offset);

      list.push({ remoteId, localId });
    });
  });

  return list;
}

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
      console.log('compute plot view map');
      return _reduce(getEntryPointsFromState(configuration), (list, ep) => {
        if (!ep || !ep.name || !ep.connectedDataX || !ep.connectedDataY) {
          return list;
        }

        const x = mapAxe(domains, timelines, timebarId, ep.connectedDataX);
        const y = mapAxe(domains, timelines, timebarId, ep.connectedDataY);

        // TODO: remove and clarify the wildcard-match-multi-sessions-domains handling in plot view
        if (!x.length || !y.length) {
          console.warn(
            'ignoring plot entry point due to at least one invalid connectedData',
            ep.name,
            '(no matching domain/session)'
          );
          return list;
        }
        if (x.length > 1 || y.length > 1) {
          console.warn(
            'ignoring plot entry point due to at least one invalid connectedData',
            ep.name,
            '(too many matching domain/session)'
          );
          return list;
        }
        const cdX = x[0];
        const cdY = y[0];
        if (cdX.remoteId !== cdY.remoteId) {
          console.warn(
            'ignoring plot entry point due to parametric connectedData configuration',
            ep.name
          );
          return list;
        }

        return _set(list, [ep.name], { x: cdX, y: cdY });
      }, {});
    }
  );
}

export default function getDataFromCache() {
  /**
   * Returns cache data for given view.
   *
   * {
   *   lines: [
   *     {
   *       key: string,
   *       color: string,
   *       name: string,
   *     },
   *   ],
   *   columns: [
   *     {x: timestamp, 'key1': number, 'key2': number }
   *   ],
   * }
   *
   * /!\ Support only entryPoints with timebased data, no wildcards and same parameter for x and y
   * TODO : analyse, define and implement other curves types
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
      console.log('compute plot data');

      let i = 1;
      const lines = [];
      const dictionary = {};
      _each(map, ({ x, y }, name) => {
        const key = `col${i}`;
        i += 1;

        /**
         * xValues = { timestamp: boardDate }
         * yValues = { timestamp: extractedValue }
         *
         * dictionary = { 'boardDate': { 'key': extractedValue } }
         *
         * data = [{ x: boardDate, 'key': extractedValue }]
         */

        // line
        lines.push({ key, color: '#FF0000', name });

        // values
        const xValues = _get(cache, [x.remoteId, x.localId]);
        const yValues = _get(cache, [y.remoteId, y.localId]);

        _each(xValues, (xValue, timestamp) => {
          const yValue = yValues[timestamp];
          if (typeof yValue === 'undefined') {
            return;
          }

          if (!_has(dictionary, [xValue, key])) {
            _set(dictionary, [xValue, 'x'], new Date(xValue));
          }

          _set(dictionary, [xValue, key], yValue);
        });
      });

      return {
        lines,
        columns: _map(dictionary),
      };
    }
  );
}
