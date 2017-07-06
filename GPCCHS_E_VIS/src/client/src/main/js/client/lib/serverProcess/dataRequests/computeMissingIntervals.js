import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
import globalConstants from '../../constants';
import { addInterval, retrieveNeededIntervals } from '../../viewManager/commonData/intervalManagement';
import { getStructureType } from '../../viewManager';

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
 * forecastIntervals: {
 *   'remoteId': {
 *     'localId': {
 *       expectedInterval: [number, number]
 *     }
 *   }
 * }
 *
 * @param dataMap
 * @param lastMap
 * @param forecastIntervals: undefined or with same keys as expectedIntervals
 * @return object
 */
export default function computeMissingIntervals(dataMap, lastMap, forecastIntervals) {
  const queries = {};
  _each(dataMap.perRemoteId, ({ dataId, localIds, views }, remoteId) => {
    _each(localIds, ({ viewType }, localId) => {
      // If forecast, use this intervalMap
      let needed = [];
      if (forecastIntervals) {
        needed.push(forecastIntervals[remoteId][localId].expectedInterval); // TODO should be done outside this function
      } else {
        const knownInterval =
          _get(lastMap, ['expectedIntervals', remoteId, localId, 'expectedInterval']);
        const expectedInterval =
          _get(dataMap, ['expectedIntervals', remoteId, localId, 'expectedInterval']);
        if (!expectedInterval) {
          return;
        }
        needed = retrieveNeededIntervals(knownInterval, expectedInterval);
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
      }

      if (!queries[remoteId]) {
        queries[remoteId] = {
          dataId,
          [globalConstants.DATASTRUCTURETYPE_LAST]: [],
          [globalConstants.DATASTRUCTURETYPE_RANGE]: [],
        };
      }

      _each(needed, (m) => {
        // In play mode all intervals with range type
        if (forecastIntervals) {
          queries[remoteId][globalConstants.DATASTRUCTURETYPE_RANGE] =
            addInterval(queries[remoteId][globalConstants.DATASTRUCTURETYPE_RANGE], m); // TODO should be done outside this function
        } else {
          // Check viewType to determine how to request
          const structureType = getStructureType(viewType);
          if (structureType === globalConstants.DATASTRUCTURETYPE_RANGE) {
            queries[remoteId][structureType] = addInterval(queries[remoteId][structureType], m);
          } else {
            queries[remoteId][structureType].push(m);
          }
        }
      });
    });
  });

  return queries;
}
