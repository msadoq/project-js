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
import Cache from './Cache';

const mapStateToProps = state => ({
  lastCacheCleanUp: getLastCacheInvalidation(state),
});

const CacheContainer = connect(mapStateToProps, { updateCacheInvalidation })(Cache);

export default CacheContainer;
