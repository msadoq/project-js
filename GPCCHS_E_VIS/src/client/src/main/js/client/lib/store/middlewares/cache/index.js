import { get } from '../../../common/configurationManager';
import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import cacheClean from './cacheCleanUp';

const createCacheMiddleware = lokiManager => pipeMiddlewares(
  cacheClean(get('FORECAST_TRIGGER'), lokiManager)
);

export default createCacheMiddleware;
