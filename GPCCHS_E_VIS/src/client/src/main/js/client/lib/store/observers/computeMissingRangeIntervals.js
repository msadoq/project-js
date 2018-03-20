// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// END-HISTORY
// ====================================================================

import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
import { retrieveNeededIntervals } from 'viewManager/commonData/intervalManagement';
import mergeInterval from 'common/intervals/merge';
import { getFilters } from '../../common/flattenDataId';

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
export default function computeMissingRangeIntervals(dataMap, lastMap) {
  const queries = {};
  _each(dataMap.perRangeTbdId, ({ dataId, localIds, views, filters, mode }, tbdId) => {
    _each(localIds, (value, localId) => {
      let needed = [];
      const knownInterval =
        _get(lastMap, ['expectedRangeIntervals', tbdId, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedRangeIntervals', tbdId, localId, 'expectedInterval']);
      if (!expectedInterval) {
        return;
      }
      // Retrieve needed interval
      needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      if (!needed.length) {
        // Check if there is not a new view requesting the data
        const lastViews = lastMap.perRangeTbdId[tbdId].views;
        // same views or view removed
        if (_isEqual(views, lastViews) || _isEqual(_intersection(views, lastViews), views)) {
          return;
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed.push(expectedInterval);
      }

      if (!queries[tbdId]) {
        const f = getFilters(tbdId);
        // save filters if they are stored in remoteId
        let query = {
          dataId,
          intervals: [],
        };
        if (mode) {
          query = { ...query, mode };
        }
        if (f.length > 0) {
          query = { ...query, filters: f };
        }
        queries[tbdId] = query;
      }

      _each(needed, (m) => {
        // add needed Intervals to queries
        queries[tbdId].intervals = mergeInterval(queries[tbdId].intervals, m);
      });
    });
  });

  return queries;
}
