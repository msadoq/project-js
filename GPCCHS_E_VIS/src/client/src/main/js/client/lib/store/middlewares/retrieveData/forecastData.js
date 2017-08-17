import * as types from '../../types';
import { getMissingIntervals, getKnownRanges } from '../../reducers/knownRanges';
import { getPlayingTimebarId } from '../../reducers/hsc';
import { getTimebar } from '../../reducers/timebars';
import dataMapGenerator from '../../../dataManager/map';
import mergeIntervals from '../../../common/intervals/merge';

import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';


const type = 'RANGE';
let previousForecast;

const forecastData = (ipc, forecastTime, forecastTrigger) => ({ getState }) => next => (action) => {
  if (action.type === types.WS_TIMEBAR_UPDATE_CURSORS) {
    const state = getState();
    const playingTimebarId = getPlayingTimebarId(state);
    if (playingTimebarId) {
      const visuWindow = getTimebar(state, { timebarUuid: playingTimebarId }).visuWindow;
      if (!previousForecast || (previousForecast.end - visuWindow.upper <= forecastTrigger)) {
        const dataMap = dataMapGenerator(state);
        const forecastIntervals = dataMap.forecastIntervals;
        const tbdIds = Object.keys(forecastIntervals);
        for (let i = 0; i < tbdIds.length; i += 1) {
          const currentTbdId = tbdIds[i];
          const currentForecastInterval = forecastIntervals[currentTbdId];
          const localsIds = Object.keys(currentForecastInterval);
          let mergedInterval = [];
          for (let j = 0; j < localsIds.length; j += 1) {
            mergedInterval = mergeIntervals(mergedInterval,
                                            currentForecastInterval[localsIds[j]].expectedInterval);
          }
          for (let k = 0; k < mergedInterval.length; k += 1) {
            const knownRanges = getKnownRanges(state, { tbdId: currentTbdId });
            if (knownRanges) {
              const { dataId, filters } = knownRanges;
              const missingIntervals = getMissingIntervals(state,
                { tbdId: currentTbdId,
                  queryInterval: mergedInterval[k],
                });
              for (let l = 0; l < missingIntervals.length; l += 1) {
                const queryId = ipc.dc.requestTimebasedQuery(currentTbdId,
                                                            dataId,
                                                            missingIntervals[l],
                                                            { filters });
                add(queryId, currentTbdId, type, dataId);
              }
            }
          }
        }
        const now = visuWindow.upper;
        previousForecast = { start: now, end: now + forecastTime };
      }
    }
  }
  return next(action);
};

export default forecastData;
