import _get from 'lodash/get';
import _each from 'lodash/each';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
// import { getVisuWindowByViewId } from 'store/selectors/views';
import { getPlayingTimebarId } from '../reducers/hsc';
// import { getPageByViewId } from '../reducers/pages';
import { retrieveNeededIntervals } from '../../viewManager/commonData/intervalManagement';
// import { getFilters } from '../../common/flattenDataId';

/**
 * return the current window interval for each pusId
 */
export default function computeMissingPusIntervals(state, dataMap, previousDataMap) {
  const queries = {};
  _each(dataMap.perPusId, ({ dataId, localIds, views }, tbdId) => {
    _each(localIds, (value, localId) => {
      let needed = [];
      const knownInterval =
        _get(previousDataMap, ['expectedPusIntervals', tbdId, localId, 'expectedInterval']);
      const expectedInterval =
        _get(dataMap, ['expectedPusIntervals', tbdId, localId, 'expectedInterval']);
      needed = retrieveNeededIntervals(knownInterval, expectedInterval);

      if (!needed.length) {
        // Check if there is not a new view requesting the data
        const lastViews = previousDataMap.perPusId[tbdId].views;
        // same views or view removed
        if (_isEqual(views, lastViews) || _isEqual(_intersection(views, lastViews), views)) {
          return;
        }
        // If a new view has been opened, add a request on the whole expected interval
        // Normally data are in cache as a request has been already done before
        needed.push(expectedInterval);
      }

      _each(views, (() => {
        const playingTimebarId = getPlayingTimebarId(state);
        const timebarUuid = dataMap.perPusId[tbdId].localIds[localId].timebarUuid;
        // this condition is checking if timebar is currently in playing mode
        // if it is, data are given by the forecast
        // view is not needing data
        if ((!playingTimebarId || timebarUuid !== playingTimebarId) && !queries[tbdId]) {
          const query = {
            dataId,
            interval: needed[0],
          };
          queries[tbdId] = query;
        }
      }));
    });
  });
  return queries;
}
