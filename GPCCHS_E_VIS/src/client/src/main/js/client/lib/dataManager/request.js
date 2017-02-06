import _isObject from 'lodash/isObject';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import getLogger from 'common/log';
import globalConstants from 'common/constants';

import { operators } from '../common/operators';
import structures from './structures';

const logger = getLogger('data:requests');

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
 *          timebarUuid: string,
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
  _each(dataMap, ({ structureType, dataId, filter, localIds, views }, remoteId) => {
    const retrieveNeededIntervals = structures(structureType, 'retrieveNeededIntervals');
    const addInterval = structures(structureType, 'addInterval');

    _each(localIds, ({ expectedInterval }, localId) => {
      const knownInterval = _get(lastMap, [remoteId, 'localIds', localId, 'expectedInterval']);
      const needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      if (!needed.length) {
        // Check if there is not a new view requesting the data
        if (_isEqual(views, lastMap[remoteId].views)
        || views.length < lastMap[remoteId].views.length) {
          return;
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed.push(expectedInterval);
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

export default function request(dataMap, lastMap, send) {
  // compute missing data
  const dataQueries = missingRemoteIds(dataMap, lastMap);

  const n = Object.keys(dataQueries).length;
  logger.debug(`dataQueries was generated for ${n}`, dataQueries);

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    send(globalConstants.IPC_METHOD_TIMEBASED_QUERY, { queries: dataQueries });
  }
}
