import _each from 'lodash/each';
import _set from 'lodash/set';
import { createSelector } from 'reselect';
import { getTimebars } from '../store/reducers/timebars';
import { getStructureModule } from '../viewManager';
import { getPlayingTimebarId } from '../store/reducers/hsc';

export function intervalPerRemoteId(timebars, remoteIdData) { // , tbUuidPlaying) {
  const expectedIntervals = {};
  const { localIds } = remoteIdData;
  // loop on local ids
  _each(localIds, (localIdData, localId) => {
    const { offset, timebarUuid, viewType } = localIdData;
    if (!timebars[timebarUuid]) {
      _set(expectedIntervals, [localId, 'error'], 'invalid timebar');
      return;
    }
    const { visuWindow } = timebars[timebarUuid];
    // expectedInterval
    const expectedInterval = getStructureModule(viewType).getExpectedInterval(
      visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
    );
    if (!expectedInterval) {
      _set(expectedIntervals, [localId, 'error'], 'no valid expected interval found');
      return;
    }
    _set(expectedIntervals, [localId, 'expectedInterval'], expectedInterval);
    // add interval in play mode with 1 minute more and save it has requestedInterval
    // console.log('***tbId', tbUuidPlaying, timebarUuid);
    // if (tbUuidPlaying === timebarUuid) {
    //   const requestedInterval = [expectedInterval[0], expectedInterval[1] + 60000];
    //   _set(expectedIntervals, [localId, 'requestedInterval'], requestedInterval);
    // } else {
    //   _set(expectedIntervals, [localId, 'requestedInterval'], expectedInterval);
    // }
  });

  return expectedIntervals;
}

export function expectedIntervalMap(timebars, perRemoteIdMap, tbUuidPlaying) {
  const intervalMap = {};
  _each(perRemoteIdMap, (remoteIdData, remoteId) => {
    const localIdIntervals = intervalPerRemoteId(timebars, remoteIdData, tbUuidPlaying);
    if (Object.keys(localIdIntervals).length) {
      intervalMap[remoteId] = localIdIntervals;
    }
  });
  return intervalMap;
}

export default createSelector(
  getTimebars,
  (state, { perRemoteIdMap }) => perRemoteIdMap,
  getPlayingTimebarId,
  (timebars, perRemoteIdMap, tbUuidPlaying) => expectedIntervalMap(
    timebars,
    perRemoteIdMap,
    tbUuidPlaying));
