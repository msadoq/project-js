import _throttle from 'lodash/throttle';
import _isObject from 'lodash/isObject';

import { constants as globalConstants } from 'common';

import debug from '../debug/mainDebug';
import profiling from '../debug/profiling';
import map from './map/visibleRemoteIds';
import missingRemoteIds from './map/missingRemoteIds';
import { getWebsocket } from '../websocket/mainWebsocket';
import { addRequests } from '../../store/actions/dataRequests';

const logger = debug('data:requests');

function request(state, dispatch) {
  logger.verbose('begin');

  const start = profiling.start();

  // TODO : improve memoization
  const dataMap = map(state);
  logger.verbose(dataMap);

  const dataQueries = missingRemoteIds(dataMap);
  logger.verbose(dataQueries);

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    getWebsocket().write({ event: globalConstants.EVENT_TIMEBASED_QUERY, payload: dataQueries });
  }

  dispatch(addRequests(dataQueries));

  profiling.stop(
    start,
    `dataRequests (${Object.keys(dataQueries).length} remoteId)`
  );
}

export default _throttle(request, globalConstants.HSC_THROTTLE_REQUESTS);
