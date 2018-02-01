// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Separate expectedIntervalsMap by structure type in dataMap
// END-HISTORY
// ====================================================================

import _each from 'lodash/each';
import _set from 'lodash/set';
import { getStructureModule } from '../viewManager';
import { get } from '../common/configurationManager';

export function intervalPerRangeTbdId(
  timebars,
  tbdId,
  rangeTbdIdData,
  forecastIntervals,
  forecastTime
) {
  const localIdIntervals = {};
  const { localIds } = rangeTbdIdData;
  const fIntervals = forecastIntervals;

  // loop on local ids
  _each(localIds, (localIdData, localId) => {
    const { offset, timebarUuid, viewType } = localIdData;
    if (!timebars[timebarUuid]) {
      _set(localIdIntervals, [localId, 'error'], 'invalid timebar');
      return;
    }
    const { visuWindow } = timebars[timebarUuid];

    const visuWindowMaxDuration = get('VISU_WINDOW_MAX_DURATION');
    const duration = visuWindow.upper - visuWindow.lower;
    // Check visuWindow duration for this type of view
    if (visuWindowMaxDuration && visuWindowMaxDuration[viewType]) {
      const maxDuration = visuWindowMaxDuration[viewType];
      if (duration > maxDuration) {
        _set(localIdIntervals, [localId, 'error'],
          'Window visualisation is too long for this type of view: max = '.concat(maxDuration));
        return;
      }
    }
    // expectedInterval
    const expectedInterval = getStructureModule(viewType).getExpectedInterval(
      visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
    );
    if (!expectedInterval) {
      _set(localIdIntervals, [localId, 'error'], 'no valid expected interval found');
      return;
    }
    _set(localIdIntervals, [localId, 'expectedInterval'], expectedInterval);

    // Compute forecast interval
    _set(fIntervals, [tbdId, localId, 'expectedInterval'],
      [expectedInterval[1], expectedInterval[1] + forecastTime]);
  });

  return { localIdIntervals, forecastIntervals: fIntervals };
}

export default function expectedRangeIntervalMap(
  timebars,
  perRangeTbdIdMap,
  forecastIntervalsMap,
  forecastTime
) {
  const intervalRangeMap = {};
  let newForecastIntervalsMap = forecastIntervalsMap;

  _each(perRangeTbdIdMap, (rangeTbdIdData, tbdId) => {
    const { localIdIntervals, forecastIntervals } = intervalPerRangeTbdId(
      timebars,
      tbdId,
      rangeTbdIdData,
      newForecastIntervalsMap,
      forecastTime);

    if (Object.keys(localIdIntervals).length) {
      intervalRangeMap[tbdId] = localIdIntervals;
      newForecastIntervalsMap = forecastIntervals;
    }
  });
  return {
    expectedRangeIntervals: intervalRangeMap,
    forecastIntervals: newForecastIntervalsMap,
  };
}
