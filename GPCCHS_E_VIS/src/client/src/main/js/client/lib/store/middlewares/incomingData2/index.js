import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import prepareRange from './prepareRange';
import prepareLast from './prepareLast';
import preparePubSub from './preparePubSub';
import injectData from './injectData';

const createIncomingDataMiddleware = () => pipeMiddlewares(
  prepareRange(),
  prepareLast(),
  preparePubSub(),
  injectData()
);

export default createIncomingDataMiddleware;
