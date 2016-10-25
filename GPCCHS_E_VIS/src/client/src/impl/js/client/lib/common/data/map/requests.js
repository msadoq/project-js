import { each, get, map } from 'lodash';
import { intervals as intervalManager } from 'common';
import operators from '../../operators';

/**
 * Return the current missing intervals requests list
 *
 * {
 *   'remoteId': {
 *     dataId: {},
 *     filter: {},
 *     localIds: {
 *       'localId': {
 *          viewType: string,
 *          field: string,
 *          timebarId: string,
 *          offset: number,
 *          expectedInterval: [number, number],
 *        }
 *     }
 *   }
 * }
 *
 * @param state
 * @param dataMap
 * @return object
 */
export default function requestsMap(state, dataMap) {
  const queries = {};
  each(dataMap, ({ dataId, filter, localIds }, remoteId) => {
    each(localIds, ({ expectedInterval }) => {
      // TODO memoize
      const knownIntervals = get(state, ['dataRequests', remoteId], []);

      const needed = intervalManager.missing(knownIntervals, expectedInterval);
      if (!needed.length) {
        return [];
      }

      if (!queries[remoteId]) {
        const queryArguments = {
          filters: (typeof filter === 'undefined') ? [] : map(filter, f => ({
            fieldName: f.field,
            type: operators[f.operator],
            fieldValue: f.operand,
          })),
        };
        queries[remoteId] = {
          dataId,
          intervals: [],
          queryArguments,
        };
      }

      each(needed, (m) => {
        queries[remoteId].intervals = intervalManager.merge(queries[remoteId].intervals, m);
      });
    });
  });

  return queries;
}
