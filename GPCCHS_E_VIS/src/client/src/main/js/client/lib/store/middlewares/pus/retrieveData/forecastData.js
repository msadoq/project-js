import { getPlayingTimebarId } from 'store/reducers/hsc';
import { getTimebar } from 'store/reducers/timebars';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_PUS } from 'constants';
import * as types from '../../../types';
import dataMapGenerator from '../../../../dataManager/map';
import mergeIntervals from '../../../../common/intervals/merge';
import { getMissingIntervals } from '../../../reducers/pus';
import { sendArchiveQuery } from '../../../actions/pus/knownPus';
import { add } from '../../../../serverProcess/models/registeredArchiveQueriesSingleton';

// TODO remove this and make a real callback
const makeCallback = () => () => {};

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
        const forecastPusIntervals = dataMap.forecastPusIntervals;
        const flattenIds = Object.keys(forecastPusIntervals);
        for (let i = 0; i < flattenIds.length; i += 1) {
          const currentFlattenId = flattenIds[i];
          const currentForecastInterval = forecastPusIntervals[currentFlattenId];
          const localsIds = Object.keys(currentForecastInterval);
          let mergedInterval = [];
          execution.start('Merge intervals');
          for (let j = 0; j < localsIds.length; j += 1) {
            mergedInterval = mergeIntervals(mergedInterval,
              currentForecastInterval[localsIds[j]].expectedInterval);
          }
          execution.stop('Merge intervals');
          for (let k = 0; k < mergedInterval.length; k += 1) {
            const { dataId } = dataMap.perPusId[currentFlattenId];
            if (dataId) {
              const { apids } = dataId;
              const apidRawValues = apids.map(apid => ({ value: apid.apidRawValue }));
              const missingIntervals = getMissingIntervals(getState(),
                {
                  pusService: dataId.pusService,
                  pusId: currentFlattenId,
                  queryInterval: mergedInterval[k],
                }
              );
              for (let j = 0; j < missingIntervals.length; j += 1) {
                const queryId = ipc.pus.initialize(
                  {
                    sessionId: dataId.sessionId,
                    domainId: dataId.domainId,
                    pusService: dataId.pusService, // type de pus 11, mme, 12 ...
                    pusServiceApid: apidRawValues, // apids
                  }, // header
                  false, // forReplay
                  missingIntervals[j][0], // firstTime,
                  missingIntervals[j][1], // lastTime,
                  true, // continuous,
                  makeCallback()
                );

                add(queryId, currentFlattenId, PREFIX_PUS, dataId);
              }
              dispatch(sendArchiveQuery(
                dataId.pusService,
                currentFlattenId,
                dataId,
                mergedInterval)
              );
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
