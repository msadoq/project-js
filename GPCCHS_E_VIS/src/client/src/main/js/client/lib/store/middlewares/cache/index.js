// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import cacheClean from './cacheCleanUp';
import saveCache from './saveCache';

const createCacheMiddleware = lokiGenericManager => pipeMiddlewares(
  cacheClean(get('CACHE_INVALIDATION_FREQUENCY')),
  saveCache(lokiGenericManager)
);

export default createCacheMiddleware;
