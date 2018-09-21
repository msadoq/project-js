import _ from 'lodash/fp';
import { getPlayingTimebarId } from 'store/reducers/hsc';
import { getTimebar } from 'store/reducers/timebars';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_PUS } from 'constants';
import * as types from '../../../types';
import dataMapGenerator from '../../../../dataManager/map';
import { sendArchiveQuery } from '../../../actions/pus/knownPus';
import { add } from '../../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { getPusFlattenId } from '../../../../common/flattenDataId';

// TODO remove this and make a real callback
const makeCallback = () => () => {};

let previousForecast;
// playPressed is used to relaunch a forecast every time the play button is pressed
// For example, this is useful when you change a page, and you pressed play, forecast is launched again
let playPressed = false;

const forecastData = (ipc, time, trigger) => ({ getState, dispatch }) => next => (action) => {
  const execution = executionMonitor('middleware:forecastData');
  if (action.type === types.HSC_PLAY) {
    playPressed = true;
  }

  if (action.type === types.WS_TIMEBAR_UPDATE_CURSORS) {
    const state = getState();
    const playingTimebarId = getPlayingTimebarId(state);
    if (playingTimebarId) {
      const timebar = getTimebar(state, { timebarUuid: playingTimebarId });
      const visuWindow = timebar.visuWindow;
      if (!previousForecast ||
        (previousForecast.end - visuWindow.upper <= trigger) ||
        playPressed
      ) {
        execution.start('Global');
        const continous = !playPressed;
        playPressed = false;
        execution.start('DataMap generation');
        const dataMap = dataMapGenerator(state);
        execution.stop('DataMap generation');
        const flattenIds = Object.keys(dataMap.perPusId);
        const now = visuWindow.upper;
        for (let i = 0; i < flattenIds.length; i += 1) {
          const flattenId = flattenIds[i];
          const { dataId } = dataMap.perPusId[flattenId];
          const { apids } = dataId;
          if (dataId) {
            for (let j = 0; j < apids.length; j += 1) {
              const apidFlattenId = getPusFlattenId([apids[j]], dataId);
              // get known interval for the flattenId of the pus view
              const knownInterval = _.getOr([], ['knownPus', dataId.pusService, apidFlattenId, 'interval'], state);
              // the new known interval will be the old interval plus the forecast time
              const newInterval = [knownInterval[0], knownInterval[1] + time];
              // forecast is an initialise call with continuous = true
              const queryId = ipc.pus.initialize(
                {
                  sessionId: dataId.sessionId,
                  domainId: dataId.domainId,
                  pusService: dataId.pusService, // type de pus 11, mme, 12 ...
                  pusServiceApid: [{ value: apids[j].apidRawValue }], // apids
                }, // header
                !timebar.realTime, // forReplay
                newInterval[0], // firstTime,
                newInterval[1], // lastTime,
                continous, // continuous,
                makeCallback()
              );

              add(queryId, flattenId, PREFIX_PUS, dataId);
              dispatch(sendArchiveQuery(
                dataId.pusService,
                dataId,
                newInterval,
                true
                )
              );
            }
          }
        }
        previousForecast = { start: now, end: Number(now) + Number(time) };
        execution.stop('Global');
        execution.print();
      }
    }
  }
  return next(action);
};

export default forecastData;
