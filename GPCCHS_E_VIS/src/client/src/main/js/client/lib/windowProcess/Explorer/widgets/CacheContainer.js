// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add cache and server info in explorer
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add cache tab in explorers
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Complete performance tab in explorer
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { updateCacheInvalidation } from 'store/actions/hsc';
import { getLastCacheInvalidation } from 'store/reducers/hsc';
import { getSavedCache } from 'store/reducers/cache';
import Cache from './Cache';

const saveCache = () => ({ type: 'DEBUG_SAVE_CACHE' });

const mapStateToProps = state => ({
  lastCacheCleanUp: getLastCacheInvalidation(state),
  cache: getSavedCache(state),
});

const mapDispatchToProps = {
  updateCacheInvalidation,
  saveCache,
};

const CacheContainer = connect(mapStateToProps, mapDispatchToProps)(Cache);

export default CacheContainer;
