import _isObject from 'lodash/isObject';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _get from 'lodash/get';
import executionMonitor from 'common/execution';
import getLogger from 'common/log';

import { operators } from '../common/operators';
import structures from './structures';

const logger = getLogger('GPCCHS:data:requests');
const execution = executionMonitor('data:request');

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
export function missingRemoteIds(dataMap, lastMap) {
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
          _map(
            filter,
            f => ({
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

  return queries;
}

export default function request(state, dataMap, lastMap, send) {
  execution.start('global');

  // compute missing data
  const dataQueries = missingRemoteIds(dataMap, lastMap);
  logger.verbose(JSON.stringify(dataQueries, null, 2));

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    send(1, 'timebasedQuery', dataQueries);
  }

  execution.stop('global', `dataRequests (${Object.keys(dataQueries).length} remoteId)`);
}
