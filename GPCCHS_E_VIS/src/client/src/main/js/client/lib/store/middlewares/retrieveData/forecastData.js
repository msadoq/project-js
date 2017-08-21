import * as types from '../../types';
import { getMissingIntervals } from '../../reducers/knownRanges';
import { getPlayingTimebarId } from '../../reducers/hsc';
import { getTimebar } from '../../reducers/timebars';
import dataMapGenerator from '../../../dataManager/map';
import mergeIntervals from '../../../common/intervals/merge';
import { sendArchiveQuery } from '../../actions/knownRanges';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { get, getFilters } from '../../../serverProcess/models/tbdIdDataIdMap';

const type = 'RANGE';
let previousForecast;

// playPressed is used to relaunch a forecast every time the play button is pressed
// For example, this is useful when you change a page, and you pressed play, forecast is launched again
let playPressed = false;

const forecastData = (ipc, forecastTime, forecastTrigger) => ({ getState, dispatch }) => next => (action) => {

  if (action.type === types.HSC_PLAY) {
    playPressed = true;
  }

  if (action.type === types.WS_TIMEBAR_UPDATE_CURSORS) {
    const state = getState();
    const playingTimebarId = getPlayingTimebarId(state);
    if (playingTimebarId) {
      const visuWindow = getTimebar(state, { timebarUuid: playingTimebarId }).visuWindow;
      if (!previousForecast || (previousForecast.end - visuWindow.upper <= forecastTrigger) || playPressed) {
        playPressed = false;
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
            const dataId = get(currentTbdId);
            const filters = getFilters(currentTbdId);
            const missingIntervals = getMissingIntervals(state,
              { tbdId: currentTbdId,
                queryInterval: mergedInterval[k],
              });
              // TODO get filters
            for (let l = 0; l < missingIntervals.length; l += 1) {
              const queryId = ipc.dc.requestTimebasedQuery(currentTbdId,
                                                          dataId,
                                                          missingIntervals[l],
                                                          { filters });
              add(queryId, currentTbdId, type, dataId);
            }
            dispatch(sendArchiveQuery(currentTbdId, dataId, missingIntervals, filters));
          }
        }
        const now = visuWindow.upper;
        previousForecast = { start: now, end: Number(now) + Number(forecastTime) };
      }
    }
  }
  return next(action);
};

export default forecastData;
