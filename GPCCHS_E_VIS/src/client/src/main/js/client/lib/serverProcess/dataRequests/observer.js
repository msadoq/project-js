import _get from 'lodash/get';
import { GETLASTTYPE_GET_LAST } from '../../constants';
import execution from '../../common/logManager/execution';
import getLogger from '../../common/logManager';
import { get } from '../../common/configurationManager';
import dataMapGenerator from '../../dataManager/map';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
import { getTimebar } from '../../store/reducers/timebars';
import computeForecastIntervals from './computeForecastIntervals';
import computeMissingIntervals from './computeMissingIntervals';
import connectedDataModel from '../models/connectedData';
import { addRecord as registerQuery } from '../models/registeredQueries';
import { dc } from '../ipc';

const log = getLogger('dataMap:store:observer');

const getLastArguments = { getLastType: GETLASTTYPE_GET_LAST };

function errorCallback(err) {
  if (err) {
    // TODO dispatch error message
  }
}

/**
 * Note, dataMap keys:
 * - perView
 * - perRemoteId
 * - expectedIntervals
 */

export default function makeDataRequestsObserver(store) {
  const forecastTime = get('FORECAST');
  let previous; // previous dataMap
  let previousForecast; // previous forecast while playing
  return function dataRequestsObserver() {
    log.silly('start observer');
    const profile = execution('dataMap:store:observer');

    const state = store.getState();

    // TODO skip if no windows loaded

    // data map
    profile.start('dataMap generation');
    const dataMap = dataMapGenerator(state);
    profile.stop('dataMap generation');

    // same dataMap as previous run
    if (previous && previous.expectedIntervals === dataMap.expectedIntervals) {
      previous = dataMap;
      profile.print();
      log.silly('stop observer');
      return;
    }

    profile.start('run');

    // compute forecast in play mode (if needed)
    const timebarUuid = getPlayingTimebarId(state);
    let forecastIntervals;
    if (timebarUuid) {
      const upper = _get(getTimebar(state, { timebarUuid }), ['visuWindow', 'upper']);
      if (
        !previousForecast // no existing forecast
        || (previousForecast[1] - upper) < 100 // visuWindow is near the end of the forecast interval
        || upper < previousForecast[0] // visuWindow have moved backward
      ) {
        log.debug('compute forecast');
        forecastIntervals = computeForecastIntervals(dataMap.expectedIntervals, forecastTime);

        // store forecast for next observer execution
        previousForecast = [upper, (upper + forecastTime)];
      }
    }

    // determine missing data
    const missingIntervals = computeMissingIntervals(dataMap, previous, forecastIntervals);
    const flatDataIds = Object.keys(missingIntervals);
    const n = flatDataIds.length;
    if (n) {
      log.debug(`missingIntervals was generated for ${n}`, missingIntervals);
      flatDataIds.forEach((flatDataId) => {
        const { dataId, last, range } = missingIntervals[flatDataId];

        // Loki connectedData model creation if not already exists
        const connectedData = connectedDataModel.addRecord(dataId);

        /**
         * Last queries
         */
        last.forEach((interval) => {
          // emit query to DC
          const queryId =
            dc.requestTimebasedQuery(flatDataId, dataId, interval, getLastArguments, errorCallback);

          // register query to allow easy flatDataId retrieving on data reception
          registerQuery(queryId, flatDataId); // TODO remove and implement a clean RPC with DC that take all query response chunk in one line

          console.warn('QUERY', flatDataId, getLastArguments, interval);
          // register this getLast query in connectedDataModel
          connectedDataModel.addLastQuery(connectedData, queryId, interval);
        });

        /**
         * Range queries
         */
        // determines which interval are not already in cache and concat the intervals list to query
        const intervalsToRequest = range.reduce(
          (list, interval) => list.concat(connectedDataModel.retrieveMissingIntervals(
            flatDataId,
            interval,
            connectedData
          )
        ), []);

        // query each missing interval to DC
        intervalsToRequest.forEach((interval) => {
          // emit query to DC
          const queryId =
            dc.requestTimebasedQuery(flatDataId, dataId, interval, {}, errorCallback);

          // register query to allow easy flatDataId retrieving on data reception
          registerQuery(queryId, flatDataId); // TODO remove and implement a clean RPC with DC that take all query response chunk in one line

          // register this queried interval in connectedDataModel
          connectedDataModel.addRequestedInterval(connectedData, queryId, interval);
        });
      });
    }

    // store dataMap for next observer execution
    previous = dataMap;

    profile.stop('run');
    profile.print();
  };
}
