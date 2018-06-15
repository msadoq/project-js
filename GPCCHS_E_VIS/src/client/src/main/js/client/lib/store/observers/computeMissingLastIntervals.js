// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : fix datamap for collapsed view add filter on mimic
//  entry point fix computation of missing last interval Add filter on tbdId computation for plot
//  view
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Pass mode into archive query (GMA/OBA)
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// END-HISTORY
// ====================================================================

import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
import _findIndex from 'lodash/findIndex';
import { getFilters } from '../../common/flattenDataId';

/**
 * Return the current missing intervals requests list
 * perLastTbdId:
 * {
 *   'tbdId': {
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
 * expectedLastIntervals: {
 *   'tbdId': {
 *     'localId': {
 *       expectedInterval: [number, number]
 *     }
 *   }
 * }
 *
 * @param dataMap
 * @param lastMap
 * @return {object} neededLastData
 */
export default function computeMissingLastIntervals(dataMap, lastMap) {
  const queries = {};
  _each(dataMap.perLastTbdId, ({ dataId, localIds, views, filters, mode }, tbdId) => {
    _each(localIds, (value, localId) => {
      // If forecast, use this intervalMap
      const knownInterval =
        _get(lastMap, ['expectedLastIntervals', tbdId, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedLastIntervals', tbdId, localId, 'expectedInterval']);
      if (!expectedInterval) {
        return;
      }

      // get needed interval by comparison
      let needed;
      // Intervals are the same
      if (!knownInterval) {
        needed = expectedInterval;
      } else if (knownInterval[0] === expectedInterval[0]
        && knownInterval[1] === expectedInterval[1]) {
        // Check if there is not a new view requesting the data
        const lastViews = lastMap.perLastTbdId[tbdId].views;
        // same views or view removed
        if (_isEqual(views, lastViews) || _isEqual(_intersection(views, lastViews), views)) {
          return;
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed = expectedInterval;
      } else if (expectedInterval[1] <= knownInterval[1]
        || knownInterval[1] <= expectedInterval[0]) {
        // keep expectedInterval if expectedInterval.upper is <= knownInterval.upper
        // or expectedInterval.upper is >= knownInterval.upper and knownInterval.upper <= expectedInterval.lower
        needed = expectedInterval;
      } else {
        // else, if knownInterval.upper > expectedInterval.lower ==> [knownInterval.upper, expectedInterval.upper]
        needed = [knownInterval[1], expectedInterval[1]];
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

      // Check if interval is not already in queries
      const index = _findIndex(queries[tbdId].intervals,
        interval => interval[0] === needed[0] && interval[1] === needed[1]);
      if (index === -1) {
        // Save in final object
        queries[tbdId].intervals.push(needed);
      }
    });
  });

  return queries;
}
