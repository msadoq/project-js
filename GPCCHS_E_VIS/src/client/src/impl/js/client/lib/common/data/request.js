import _throttle from 'lodash/throttle';
import _isObject from 'lodash/isObject';


import globalConstants from 'common/constants';

import debug from '../debug/mainDebug';
import profiling from '../debug/profiling';
import missingRemoteIds from './map/missingRemoteIds';
import { getWebsocket } from '../websocket/mainWebsocket';
import { addRequests } from '../../store/actions/dataRequests';

const logger = debug('data:requests');

function request(state, dispatch, dataMap, lastMap) {
  logger.verbose('begin');

  const start = profiling.start();

  // compute missing data
  const dataQueries = missingRemoteIds(dataMap, lastMap);
  logger.verbose(dataQueries);

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    // send to HSS
    getWebsocket().write({ event: globalConstants.EVENT_TIMEBASED_QUERY, payload: dataQueries });

    // update store
    dispatch(addRequests(dataQueries));
  }

  profiling.stop(
    start,
    `dataRequests (${Object.keys(dataQueries).length} remoteId)`
  );
}

export default _throttle(request, globalConstants.HSC_THROTTLE_REQUESTS);
