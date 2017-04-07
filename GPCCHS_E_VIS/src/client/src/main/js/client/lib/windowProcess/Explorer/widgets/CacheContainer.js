import { connect } from 'react-redux';
import Cache from './Cache';
import { updateCacheInvalidation } from '../../../store/actions/hsc';
import { getLastCacheInvalidation } from '../../../store/reducers/hsc';

const mapStateToProps = state => ({
  lastCacheCleanUp: getLastCacheInvalidation(state),
});

const CacheContainer = connect(mapStateToProps, { updateCacheInvalidation })(Cache);

export default CacheContainer;
