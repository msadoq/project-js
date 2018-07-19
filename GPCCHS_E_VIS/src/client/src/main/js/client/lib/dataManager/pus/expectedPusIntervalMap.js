import _each from 'lodash/each';
import _set from 'lodash/set';
import { get } from '../../common/configurationManager/index';
import { getStructureModule } from '../../viewManager/index';

export function intervalPerPusId(
  timebars,
  id,
  pusIdData,
  forecastIntervals,
  forecastTime
) {
  const localIdIntervals = {};
  const { localIds } = pusIdData;
  const fIntervals = forecastIntervals;

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
    _set(fIntervals, [id, localId, 'expectedInterval'],
      [expectedInterval[1], expectedInterval[1] + forecastTime]);
  });

  return { localIdIntervals, forecastIntervals: fIntervals };
}

export default function expectedLastIntervalMap(
  timebars,
  perPusIdMap,
  forecastIntervalsMap,
  forecastTime
) {
  const intervalPusMap = {};
  let newForecastIntervalsMap = forecastIntervalsMap;
  _each(perPusIdMap, (pusIdData, id) => {
    const { localIdIntervals, forecastIntervals } = intervalPerPusId(
      timebars,
      id,
      pusIdData,
      newForecastIntervalsMap,
      forecastTime);

    if (Object.keys(localIdIntervals).length) {
      intervalPusMap[id] = localIdIntervals;
      newForecastIntervalsMap = forecastIntervals;
    }
  });

  return {
    expectedPusIntervals: intervalPusMap,
    forecastIntervals: newForecastIntervalsMap,
  };
}
