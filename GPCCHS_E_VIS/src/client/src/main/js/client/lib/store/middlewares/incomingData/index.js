import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import prepareRange from './prepareRange';
import prepareLast from './prepareLast';
import preparePubSub from './preparePubSub';
import injectData from './injectData';

const createIncomingDataMiddleware = lokiManager => pipeMiddlewares(
  prepareRange(lokiManager),
  prepareLast(lokiManager),
  preparePubSub(lokiManager),
  injectData()
);

export default createIncomingDataMiddleware;
