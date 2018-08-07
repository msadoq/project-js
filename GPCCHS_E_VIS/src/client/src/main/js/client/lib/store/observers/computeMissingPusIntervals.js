import _each from 'lodash/each';
import _get from 'lodash/get';
import _intersection from 'lodash/intersection';
import _isEqual from 'lodash/isEqual';
import { retrieveNeededIntervals } from '../../viewManager/commonData/intervalManagement';
import mergeInterval from '../../common/intervals/merge';

/**
 * Return the current missing intervals requests list
 * perRangeTbdId:
 * {
 *   'tbdId': {
 *     dataId: {},
 *     filters: [],
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
 * expectedRangeIntervals: {
 *   'tbdId': {
 *     'localId': {
 *       expectedInterval: [number, number]
 *     }
 *   }
 * }
 *
 * @param dataMap
 * @param lastMap
 * @return {object} neededRangeData
 */
export default function computeMissingPusIntervals(dataMap, lastMap) {
  const queries = {};
  _each(dataMap.perPusId, ({ dataId, localIds, views }, id) => {
    _each(localIds, (value, localId) => {
      const knownInterval =
        _get(lastMap, ['expectedPusIntervals', id, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedPusIntervals', id, localId, 'expectedInterval']);
      if (!expectedInterval) {
        return;
      }

      // Retrieve needed interval
      const needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      if (!needed.length) {
        // Check if there is not a new view requesting the data
        const lastViews = lastMap.perPusId[id].views;
        // same views or view removed
        if (_isEqual(views, lastViews) || _isEqual(_intersection(views, lastViews), views)) {
          return;
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed.push(expectedInterval);
      }

      if (!queries[id]) {
        queries[id] = {
          dataId,
          intervals: [],
        };
      }

      _each(needed, (m) => {
        // add needed Intervals to queries
        queries[id].intervals = mergeInterval(queries[id].intervals, m);
      });
    });
  });
  return queries;
}
