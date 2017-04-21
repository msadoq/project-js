import _isObject from 'lodash/isObject';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
import getLogger from 'common/log';
import globalConstants from 'common/constants';
import { addInterval, retrieveNeededIntervals } from '../viewManager/commonData/intervalManagement';

const logger = getLogger('data:requests');

/**
 * Return the current missing intervals requests list
 * perRemoteId:
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
 *        }
 *     }
 *   }
 * },
 * expectedIntervals: {
 *   'remoteId': {
 *     'localId': {
 *       expectedInterval: [number, number]
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
  _each(dataMap.perRemoteId, ({ dataId, localIds, views }, remoteId) => {
    _each(localIds, ({ viewType }, localId) => {
      // const retrieveNeededIntervals = getStructureModule(viewType).retrieveNeededIntervals;

      const knownInterval =
        _get(lastMap, ['expectedIntervals', remoteId, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedIntervals', remoteId, localId, 'expectedInterval']);
      const needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      if (!needed.length) {
        // Check if there is not a new view requesting the data
        const lastViews = lastMap.perRemoteId[remoteId].views;
        // same views or view removed
        if (_isEqual(views, lastViews) || _isEqual(_intersection(views, lastViews), views)) {
          return;
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed.push(expectedInterval);
      }

      if (!queries[remoteId]) {
        queries[remoteId] = {
          dataId,
          intervals: [],
        };
      }

      _each(needed, (m) => {
        queries[remoteId].intervals = addInterval(queries[remoteId].intervals, m);
      });
    });
  });

  return queries;
}

// entire dataMap to get perRemoteId and expectedIntervals
export default function request(dataMap, lastMap, send) {
  // compute missing data
  const dataQueries = missingRemoteIds(dataMap, lastMap);

  const n = Object.keys(dataQueries).length;
  logger.debug(`dataQueries was generated for ${n}`, dataQueries);
  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    send(globalConstants.IPC_METHOD_TIMEBASED_QUERY, { queries: dataQueries });
  }
}
