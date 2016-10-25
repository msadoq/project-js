import _throttle from 'lodash/throttle';
import _isObject from 'lodash/isObject';

import { constants as globalConstants } from 'common';

import debug from '../debug/mainDebug';
import profiling from '../debug/profiling';
import visibleDataMap from './map/visible';
import requestsMapGenerator from './map/requests';
import { getWebsocket } from '../websocket/mainWebsocket';
import { addRequests } from '../../store/actions/dataRequests';

const logger = debug('data:requests');

export default _throttle((state, dispatch) => {
  logger.verbose('begin data/requests');

  const start = profiling.start();

  // TODO : improve memoization
  const dataMap = visibleDataMap(state);
  logger.verbose(dataMap);

  // TODO : improve memoization: pass dataRequests as arguments (/!\ no reselect, should never
  //        return previous requests, but maybe requesting could be done in a createSelector)
  const dataQueries = requestsMapGenerator(state, dataMap);
  logger.verbose(dataQueries);

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    getWebsocket().write({ event: globalConstants.EVENT_TIMEBASED_QUERY, payload: dataQueries });
  }

  dispatch(addRequests(dataQueries));

  profiling.stop(
    start,
    `dataRequests done (${Object.keys(dataQueries).length} remoteId requested)`
  );
}, globalConstants.HSC_THROTTLE_REQUESTS);
