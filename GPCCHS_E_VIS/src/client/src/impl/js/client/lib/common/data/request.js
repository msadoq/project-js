import _throttle from 'lodash/throttle';
import _isObject from 'lodash/isObject';

import { constants as globalConstants } from 'common';

import debug from '../debug/mainDebug';
import profiling from '../debug/profiling';
import visibleRemoteIds from './map/visibleRemoteIds';
import missingRemoteIds from './map/missingRemoteIds';
import { getWebsocket } from '../websocket/mainWebsocket';
import { addRequests } from '../../store/actions/dataRequests';

const logger = debug('data:requests');

function request(state, dispatch) {
  logger.verbose('begin');

  const start = profiling.start();

  // TODO : improve memoization
  const dataMap = visibleRemoteIds(state);
  logger.verbose(dataMap);

  // TODO : improve memoization: pass dataRequests as arguments (/!\ no reselect, should never
  //        return previous requests, but maybe requesting could be done in a createSelector)
  const dataQueries = missingRemoteIds(state, dataMap);
  logger.verbose(dataQueries);

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    getWebsocket().write({ event: globalConstants.EVENT_TIMEBASED_QUERY, payload: dataQueries });
  }

  dispatch(addRequests(dataQueries));

  profiling.stop(
    start,
    `dataRequests done (${Object.keys(dataQueries).length} remoteId requested)`
  );
}

export default _throttle(request, globalConstants.HSC_THROTTLE_REQUESTS);
