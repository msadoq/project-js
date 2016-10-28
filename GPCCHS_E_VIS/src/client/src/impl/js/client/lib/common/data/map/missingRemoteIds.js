import { each, get, map } from 'lodash';
import {
  constants as globalConstants,
  intervals as intervalManager,
} from 'common';

import profiling from '../../debug/profiling';
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
export default function missingRemoteIds(state, dataMap) {
  const start = profiling.start();
  const queries = {};
  each(dataMap, ({ dataId, filter, localIds }, remoteId) => {
    each(localIds, ({ expectedInterval }) => {
      const knownIntervals = get(state, ['dataRequests', remoteId], []);

      const needed = intervalManager.missing(knownIntervals, expectedInterval);
      if (!needed.length) {
        return [];
      }

      if (!queries[remoteId]) {
        const filters = (typeof filter === 'undefined') ?
          [] :
          map(filter, f => ({
            fieldName: f.field,
            type: operators[f.operator],
            fieldValue: f.operand,
          })
        );

        // TODO change type depending on the data structure

        queries[remoteId] = {
          type: globalConstants.DATASTRUCTURE_RANGE,
          dataId,
          intervals: [],
          filters,
        };
      }

      each(needed, (m) => {
        queries[remoteId].intervals = intervalManager.merge(queries[remoteId].intervals, m);
        // TODO getLast no interval merge if getLast
      });
    });
  });

  profiling.stop(start, 'missingRemoteIds');
  return queries;
}
