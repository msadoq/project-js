import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import prepareRange from './prepareRange';
import prepareLast from './prepareLast';
import preparePubSub from './preparePubSub';
import injectData from './injectData';

const createIncomingDataMiddleware = (lokiManager, timingInjectData) => pipeMiddlewares(
  preparePubSub(lokiManager),
  prepareRange(lokiManager),
  prepareLast(lokiManager),
  injectData(timingInjectData)
);

export default createIncomingDataMiddleware;
