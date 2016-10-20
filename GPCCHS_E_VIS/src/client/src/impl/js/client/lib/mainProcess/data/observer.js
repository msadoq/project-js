import _throttle from 'lodash/throttle';
import _isObject from 'lodash/isObject';

import { constants as globalConstants } from 'common';

import debug from '../../common/debug/mainDebug';
import dataMapGenerator from './dataMap';
import requestsMapGenerator from './requestsMap';
import { getWebsocket } from '../../common/websocket/mainWebsocket';
import { addRequests } from '../../store/actions/dataRequests';

const logger = debug('store:observers:data');

export default _throttle((state, dispatch) => {
  logger.verbose('begin data synchronisation');

  const start = process.hrtime();

  // TODO : improve memoization
  const dataMap = dataMapGenerator(state);
  // console.log(require('util').inspect(dataMap, {depth: 5}));

  // TODO : improve memoization: pass dataRequests as arguments (/!\ no reselect, should never return previous requests, but maybe requesting could be done in a createSelector)
  const dataQueries = requestsMapGenerator(state, dataMap);
  // console.log(require('util').inspect(dataQueries, {depth: 5}));

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    getWebsocket().write({ event: globalConstants.EVENT_TIMEBASED_QUERY, payload: dataQueries });
  }

  dispatch(addRequests(dataQueries));

  const duration = process.hrtime(start)[1] / 1e6;
  const count = Object.keys(dataQueries).length;
  return count
    ? logger.debug(`data requests done in ${duration}ms, ${count} remoteId requests`)
    : logger.debug('no data to requests');
}, 100); // TODO constant
