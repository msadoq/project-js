// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import prepareRange from './prepareRange';
import prepareLast from './prepareLast';
import preparePubSub from './preparePubSub';
import injectData from './injectData';
import pubSubMonitor from './pubSubMonitor';

const createIncomingDataMiddleware = (lokiManager,
                                      timingInjectData,
                                      timingPubSubMonitor) => pipeMiddlewares(
  preparePubSub(lokiManager),
  prepareRange(lokiManager),
  prepareLast(lokiManager),
  injectData(timingInjectData),
  pubSubMonitor(timingPubSubMonitor)
);

export default createIncomingDataMiddleware;
