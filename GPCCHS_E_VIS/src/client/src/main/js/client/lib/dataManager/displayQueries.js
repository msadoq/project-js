import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
import { DATASTRUCTURETYPE_LAST, DATASTRUCTURETYPE_RANGE } from '../constants';
import { getStructureType } from '../viewManager';
import { addInterval, retrieveNeededIntervals } from '../viewManager/commonData/intervalManagement';

/**
 * Return the current missing intervals to displayQueries
 *
 * @param dataMap
 * @param lastMap
 * @return object
 */
export default function displayQueries(lastMap, dataMap, isPlayingMode) {
  const queries = {};
  // loop on remoteId
  _each(dataMap.perRemoteId, ({ dataId, localIds, views }, remoteId) => {
    _each(localIds, ({ viewType }, localId) => {
      let needed = [];
      const structureType = getStructureType(viewType);
      // when timebar not in play mode
      // if case of getLast, don't ask for the data, it will be added automatically
      if (!isPlayingMode && structureType === DATASTRUCTURETYPE_LAST) {
        return;
      }
      // Comparison between intervals to determine needed interval
      const knownInterval =
        _get(lastMap, ['injectionIntervals', remoteId, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedIntervals', remoteId, localId, 'expectedInterval']);
      needed = retrieveNeededIntervals(knownInterval, expectedInterval);

      if (!needed.length) {
        // Check if there is not a new view requesting the data
        const lastViews = lastMap.injectionRemoteIdMap[remoteId].views;
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
          [DATASTRUCTURETYPE_LAST]: [],
          [DATASTRUCTURETYPE_RANGE]: [],
        };
      }

      _each(needed, (m) => {
        // Check viewType to determine how to request
        if (structureType === DATASTRUCTURETYPE_RANGE) {
          queries[remoteId][structureType] = addInterval(queries[remoteId][structureType], m);
        } else {
          queries[remoteId][structureType].push(m);
        }
      });
    });
  });
  return queries;
}
