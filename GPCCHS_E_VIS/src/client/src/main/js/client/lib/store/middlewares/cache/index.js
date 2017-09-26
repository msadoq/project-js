// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// END-HISTORY
// ====================================================================

import { get } from '../../../common/configurationManager';
import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import cacheClean from './cacheCleanUp';

const createCacheMiddleware = lokiManager => pipeMiddlewares(
  cacheClean(get('CACHE_INVALIDATION_FREQUENCY'), lokiManager)
);

export default createCacheMiddleware;
