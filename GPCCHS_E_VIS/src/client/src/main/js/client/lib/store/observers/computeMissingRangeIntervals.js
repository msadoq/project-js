// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Pass mode into archive query (GMA/OBA)
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
import { retrieveNeededIntervals } from 'viewManager/commonData/intervalManagement';
import mergeInterval from 'common/intervals/merge';
import { getViewSampling } from 'store/reducers/views';
import { getFilters } from '../../common/flattenDataId';
import samplingChanged from './samplingChanged';

/**
 * Return the current missing intervals requests list
 * perRangeTbdId:
 * {
 *   'tbdId': {
 *     dataId: {}sendArchiveQuerySamplingOn,
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
export default function computeMissingRangeIntervals(dataMap, lastMap, state) {
  const queries = {};
  _each(dataMap.perRangeTbdId, ({ dataId, localIds, views, filters, mode }, tbdId) => {
    _each(localIds, (value, localId) => {
      let needed = [];
      const knownInterval =
        _get(lastMap, ['expectedRangeIntervals', tbdId, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedRangeIntervals', tbdId, localId, 'expectedInterval']);
      // Retrieve needed interval
      // needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      const viewsWhoseSamplingChanged =
        views.filter(view => samplingChanged(dataMap, lastMap, view));
      const samplingChangedInSomeView = (Object.keys(viewsWhoseSamplingChanged).length > 0);
      if (samplingChangedInSomeView) {
        needed = retrieveNeededIntervals(null, expectedInterval);
      } else {
        needed = retrieveNeededIntervals(knownInterval, expectedInterval);
      }
      if (!needed.length) {
        // Check if there is not a new view requesting the data
        const lastViews = lastMap.perRangeTbdId[tbdId].views;
        if (!samplingChangedInSomeView) {
          // same views or view removed
          if (_isEqual(views, lastViews) || _isEqual(_intersection(views, lastViews), views)) {
            return;
          }
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed.push(expectedInterval);
      }

      _each(views, ((givenView) => {
        const sampling = getViewSampling(state, { viewId: givenView });
        if (!queries[tbdId]) {
          const f = getFilters(tbdId);
          // save filters if they are stored in remoteId
          let query = {
            dataId,
            intervals: [],
            // PlotView: sampling can be off or on
            // Onboard Alarm View request: the value associated with key 'sampling' is set to off
            sampling: _.isUndefined(sampling) ? 'off' : sampling.samplingStatus,
          };
          if (mode) {
            query = { ...query, mode };
          }
          if (f.length > 0) {
            query = { ...query, filters: f };
          }
          queries[tbdId] = query;
        }
      }));

      _each(needed, (m) => {
        // add needed Intervals to queries
        queries[tbdId].intervals = mergeInterval(queries[tbdId].intervals, m);
      });
    });
  });

  return queries;
}
