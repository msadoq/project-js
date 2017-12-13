import { connect } from 'react-redux';
import { updateCacheInvalidation } from 'store/actions/hsc';
import { getLastCacheInvalidation } from 'store/reducers/hsc';
import Cache from './Cache';

const mapStateToProps = state => ({
  lastCacheCleanUp: getLastCacheInvalidation(state),
});

const CacheContainer = connect(mapStateToProps, { updateCacheInvalidation })(Cache);

export default CacheContainer;
