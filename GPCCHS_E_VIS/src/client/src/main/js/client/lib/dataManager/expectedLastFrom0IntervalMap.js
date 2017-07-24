import _each from 'lodash/each';
import _set from 'lodash/set';
import { getStructureModule } from '../viewManager';
import { get } from '../common/configurationManager';

export function intervalPerLastFrom0TbdId(
  timebars,
  tbdId,
  lastFrom0TbdIdData,
  forecastIntervals,
  forecastTime
) {
  const localIdIntervals = {};
  const { localIds } = lastFrom0TbdIdData;
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

export default function expectedLastFrom0IntervalMap(
  timebars,
  perLastFrom0TbdIdMap,
  forecastIntervalsMap,
  forecastTime
) {
  const intervalLastFrom0Map = {};
  let newForecastIntervalsMap = forecastIntervalsMap;

  _each(perLastFrom0TbdIdMap, (lastFrom0TbdIdData, tbdId) => {
    const { localIdIntervals, forecastIntervals } = intervalPerLastFrom0TbdId(
      timebars,
      tbdId,
      lastFrom0TbdIdData,
      newForecastIntervalsMap,
      forecastTime);

    if (Object.keys(localIdIntervals).length) {
      intervalLastFrom0Map[tbdId] = localIdIntervals;
      newForecastIntervalsMap = forecastIntervals;
    }
  });
  return {
    expectedLastFrom0Intervals: intervalLastFrom0Map,
    forecastIntervals: newForecastIntervalsMap,
  };
}
