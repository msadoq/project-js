import pipeMiddlewares from '../../helpers/pipeMiddlewares';
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
