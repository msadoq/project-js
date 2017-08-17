import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import cacheClean from './cacheCleanUp';

const createCacheMiddleware = () => pipeMiddlewares(
  cacheClean()
);

export default createCacheMiddleware;
