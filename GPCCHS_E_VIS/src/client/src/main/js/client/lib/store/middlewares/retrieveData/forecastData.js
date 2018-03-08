// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Clean console log . . .
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Add a forecast on play pressed
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 28/08/2017 : Add some exectuion map + minor lint fix
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { getMissingIntervals } from 'store/reducers/knownRanges';
import { getPlayingTimebarId } from 'store/reducers/hsc';
import { getTimebar } from 'store/reducers/timebars';
import dataMapGenerator from 'dataManager/map';
import mergeIntervals from 'common/intervals/merge';
import { sendArchiveQuery } from 'store/actions/knownRanges';
import { add } from 'serverProcess/models/registeredArchiveQueriesSingleton';
import { get, getFilters } from 'serverProcess/models/tbdIdDataIdMap';
import executionMonitor from 'common/logManager/execution';

const type = 'RANGE';
let previousForecast;

// playPressed is used to relaunch a forecast every time the play button is pressed
// For example, this is useful when you change a page, and you pressed play, forecast is launched again
let playPressed = false;

const forecastData = (ipc, time, trigger) => ({ getState, dispatch }) => next => (action) => {
  const execution = executionMonitor('middleware:forecastData');
  const nextAction = next(action);
  if (action.type === types.HSC_PLAY) {
    playPressed = true;
  }

  if (action.type === types.WS_TIMEBAR_UPDATE_CURSORS) {
    const state = getState();
    const playingTimebarId = getPlayingTimebarId(state);
    if (playingTimebarId) {
      const visuWindow = getTimebar(state, { timebarUuid: playingTimebarId }).visuWindow;
      if (!previousForecast ||
          (previousForecast.end - visuWindow.upper <= trigger) ||
           playPressed
         ) {
        execution.start('Global');
        playPressed = false;
        execution.start('DataMap generation');
        const dataMap = dataMapGenerator(state);
        execution.stop('DataMap generation');
        const forecastIntervals = dataMap.forecastIntervals;
        const tbdIds = Object.keys(forecastIntervals);
        for (let i = 0; i < tbdIds.length; i += 1) {
          const currentTbdId = tbdIds[i];
          const currentForecastInterval = forecastIntervals[currentTbdId];
          const localsIds = Object.keys(currentForecastInterval);
          let mergedInterval = [];
          execution.start('Merge intervals');
          for (let j = 0; j < localsIds.length; j += 1) {
            mergedInterval = mergeIntervals(mergedInterval,
                                            currentForecastInterval[localsIds[j]].expectedInterval);
          }
          execution.stop('Merge intervals');
          for (let k = 0; k < mergedInterval.length; k += 1) {
            const dataId = get(currentTbdId);
            // TODO pgaucher dirty quickfix
            if (dataId) {
              const filters = getFilters(currentTbdId);
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
              dispatch(sendArchiveQuery(currentTbdId, dataId, missingIntervals, filters));
            }
          }
        }
        const now = visuWindow.upper;
        previousForecast = { start: now, end: Number(now) + Number(time) };
        execution.stop('Global');
        execution.print();
      }
    }
  }
  return nextAction;
};

export default forecastData;
