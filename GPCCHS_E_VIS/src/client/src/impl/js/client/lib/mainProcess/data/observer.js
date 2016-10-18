import _ from 'lodash';

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

  if (dataQueries && _.isObject(dataQueries) && Object.keys(dataQueries).length) {
    getWebsocket().write({ event: 'dataQuery', payload: dataQueries });
  }

  dispatch(addRequests(dataQueries));

  const duration = process.hrtime(start)[1] / 1e6;
  logger.debug(
    `data requests done in ${duration}ms, ${Object.keys(dataQueries).length} remoteId requests`
  );
}
