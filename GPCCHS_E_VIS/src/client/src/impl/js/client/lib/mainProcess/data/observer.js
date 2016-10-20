import { isObject as _isObject } from 'lodash';

import { constants as globalConstants } from 'common';

import debug from '../../common/debug/mainDebug';
import dataMapGenerator from './dataMap';
import requestsMapGenerator from './requestsMap';
import { getWebsocket } from '../../common/websocket/mainWebsocket';
import { addRequests } from '../../store/actions/dataRequests';

const logger = debug('store:observers:data');

// TODO _.throttle
export default function data(state, dispatch) {
  logger.verbose('begin data synchronisation');

  const start = process.hrtime();

  const dataMap = dataMapGenerator(state);
  // console.log(require('util').inspect(dataMap, {depth: 5}));

  const dataQueries = requestsMapGenerator(state, dataMap);
  // console.log(require('util').inspect(dataQueries, {depth: 5}));

  if (dataQueries && _isObject(dataQueries) && Object.keys(dataQueries).length) {
    getWebsocket().write({ event: globalConstants.EVENT_TIMEBASED_QUERY, payload: dataQueries });
  }

  dispatch(addRequests(dataQueries));

  const duration = process.hrtime(start)[1] / 1e6;
  logger.debug(
    `data requests done in ${duration}ms, ${Object.keys(dataQueries).length} remoteId requests`
  );
}
