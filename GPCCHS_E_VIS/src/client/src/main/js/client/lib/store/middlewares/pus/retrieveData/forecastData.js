import _ from 'lodash/fp';
import { getPlayingTimebarId } from 'store/reducers/hsc';
import { getTimebar } from 'store/reducers/timebars';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_PUS } from 'constants';
import * as types from '../../../types';
import dataMapGenerator from '../../../../dataManager/map';
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
        const flattenIds = Object.keys(dataMap.perPusId);
        for (let i = 0; i < flattenIds.length; i += 1) {
          const flattenId = flattenIds[i];
          const { dataId } = dataMap.perPusId[flattenId];
          if (dataId) {
            // get known interval for the flattenId of the pus view
            const knownInterval = _.getOr([], ['knownPus', dataId.pusService, flattenId, 'interval'], state);
            // the new known interval will be the old interval plus the forecast time
            const newInterval = [knownInterval[0], knownInterval[1] + time];
            const { apids } = dataId;
            const apidRawValues = apids.map(apid => ({ value: apid.apidRawValue }));
            // forecast is an initialise call with continuous = true
            const queryId = ipc.pus.initialize(
              {
                sessionId: dataId.sessionId,
                domainId: dataId.domainId,
                pusService: dataId.pusService, // type de pus 11, mme, 12 ...
                pusServiceApid: apidRawValues, // apids
              }, // header
              false, // forReplay
              newInterval[0], // firstTime,
              newInterval[1], // lastTime,
              true, // continuous,
              makeCallback()
            );

            add(queryId, apids, PREFIX_PUS, dataId);
            dispatch(sendArchiveQuery(
                dataId.pusService,
                dataId,
                newInterval,
                true
              )
            );
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
