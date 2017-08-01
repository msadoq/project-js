import _get from 'lodash/get';
import { GETLASTTYPE_GET_LAST } from '../../constants';
import { get } from '../../common/configurationManager';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
import { getTimebar } from '../../store/reducers/timebars';
import computeMissingIntervals from './computeMissingIntervals';
import connectedDataModel from '../models/connectedData';
import { addRecord as registerQuery } from '../models/registeredQueries';
import { add } from '../models/registeredArchiveQueriesSingleton';
import { dc } from '../ipc';
import flattenDataId from '../../common/flattenDataId';

const getLastArguments = { getLastType: GETLASTTYPE_GET_LAST };

export default function makeDataQueries() {
  const forecastTime = get('FORECAST');
  let previousForecast; // previous forecast while playing
  return function dataQueries(dataMap, previous, state) {
    // TODO 2 code path: 1-systematic-(simple diff of dataMaps) 2-conditional-(add forecast to queries)

    // compute forecast in play mode (if needed)
    const timebarUuid = getPlayingTimebarId(state);
    let shouldForecast = false;
    if (timebarUuid) {
      const upper = _get(getTimebar(state, { timebarUuid }), ['visuWindow', 'upper']);
      if (
        !previousForecast // no existing forecast
        || (previousForecast[1] - upper) < 100 // visuWindow is near the end of the forecast interval
        || upper < previousForecast[0] // visuWindow has moved backward
      ) {
        // store forecast for next observer execution
        previousForecast = [upper, (upper + forecastTime)];

        shouldForecast = true;
      }
    }

    // determine missing data
    const missingIntervals = computeMissingIntervals(
      dataMap,
      previous,
      shouldForecast ? dataMap.forecastIntervals : undefined
    );
    const flatDataIds = Object.keys(missingIntervals);
    const n = flatDataIds.length;

    if (n) {
      flatDataIds.forEach((flatDataId) => {
        const { dataId, last, range, filters } = missingIntervals[flatDataId];

        // Loki connectedData model creation if not already exists
        const connectedData = connectedDataModel.addRecord(dataId, filters);

        /**
         * Last queries
         *
         * Request every interval
         */
        last.forEach((interval) => {
          // filters
          const args = { ...getLastArguments, filters };
          // emit query to DC
          const queryId =
            dc.requestTimebasedQuery(flatDataId, dataId, interval, args);

          console.log('DC QUERY LAST', flatDataId);

          // register query to allow easy flatDataId retrieving on data reception
          registerQuery(queryId, flatDataId); // TODO remove and implement a clean RPC with DC that take all query response chunk in one line
          // TODO pgaucher Remove this
          add(queryId, flattenDataId(dataId, filters), 'LAST', dataId);
          // register this getLast query in connectedDataModel
          connectedDataModel.addLastQuery(connectedData, queryId, interval); // TODO if we use this record to allow incoming pub/sub data we probably need to stop removing record on TBD response OR USE dataMap on pub/sub incoming data ONLY for getLast data

          // TODO dbrugne add a third operation to get missing data from cache and dispatch to reducers
        });

        /**
         * Range queries
         *
         * Determines which interval are not already in cache and concat the intervals list
         */
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
            dc.requestTimebasedQuery(flatDataId, dataId, interval, {});

          console.log('DC QUERY RANGE', flatDataId);

          // register query to allow easy flatDataId retrieving on data reception
          registerQuery(queryId, flatDataId); // TODO remove and implement a clean RPC with DC that take all query response chunk in one line

          // register this queried interval in connectedDataModel
          connectedDataModel.addRequestedInterval(connectedData, queryId, interval);
        });
      });
    }
  };
}
