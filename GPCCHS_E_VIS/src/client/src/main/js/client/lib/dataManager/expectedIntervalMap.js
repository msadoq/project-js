import _each from 'lodash/each';
import _set from 'lodash/set';
import { createSelector } from 'reselect';
import { getTimebars } from '../store/reducers/timebars';
import { getStructureModule } from '../viewManager';
import { getPlayingTimebarId } from '../store/reducers/hsc';
import { get } from '../common/configurationManager';

export function intervalPerRemoteId(timebars, remoteIdData) {
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

    const visuWindowMaxDuration = get('VISU_WINDOW_MAX_DURATION');
    const duration = visuWindow.upper - visuWindow.lower;
    // Check visuWindow duration for this type of view
    if (visuWindowMaxDuration && visuWindowMaxDuration[viewType]) {
      const maxDuration = visuWindowMaxDuration[viewType];
      if (duration > maxDuration) {
        _set(expectedIntervals, [localId, 'error'],
          'Window visualisation is too long for this type of view: max = '.concat(maxDuration));
        return;
      }
    }
    // expectedInterval
    const expectedInterval = getStructureModule(viewType).getExpectedInterval(
      visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
    );
    if (!expectedInterval) {
      _set(expectedIntervals, [localId, 'error'], 'no valid expected interval found');
      return;
    }
    _set(expectedIntervals, [localId, 'expectedInterval'], expectedInterval);
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
