import _each from 'lodash/each';
import _get from 'lodash/get';
import _map from 'lodash/map';

import profiling from '../../debug/profiling';
import operators from '../../operators';
import structures from '../structures';

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
 * @param dataMap
 * @param lastMap
 * @return object
 */
export default function missingRemoteIds(dataMap, lastMap) {
  const start = profiling.start();
  const queries = {};
  _each(dataMap, ({ structureType, dataId, filter, localIds }, remoteId) => {
    const retrieveNeededIntervals = structures(structureType, 'retrieveNeededIntervals');
    const addInterval = structures(structureType, 'addInterval');

    _each(localIds, ({ expectedInterval }, localId) => {
      const knownInterval = _get(lastMap, [remoteId, 'localIds', localId, 'expectedInterval']);

      const needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      if (!needed.length) {
        return;
      }

      if (!queries[remoteId]) {
        const filters = (typeof filter === 'undefined') ?
          [] :
          _map(filter, f => ({
            fieldName: f.field,
            type: operators[f.operator],
            fieldValue: f.operand,
          })
        );

        queries[remoteId] = {
          type: structureType,
          dataId,
          intervals: [],
          filters,
        };
      }

      _each(needed, (m) => {
        queries[remoteId].intervals = addInterval(queries[remoteId].intervals, m);
      });
    });
  });

  profiling.stop(start, 'missingRemoteIds');
  return queries;
}
