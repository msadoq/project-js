import { connect } from 'react-redux';
import Cache from './Cache';
import { updateCacheInvalidation, play, pause } from '../../../store/actions/hsc';
import { getLastCacheInvalidation } from '../../../store/reducers/hsc';
// import { getWindowFocusedPageId } from '../../../store/reducers/windows';

const mapStateToProps = (state) => {
  console.log('');
  // const focusedPageId = getWindowFocusedPageId(state, windowId)
  return {
    lastCacheCleanUp: getLastCacheInvalidation(state),
    play,
    pause,
  };
};

const CacheContainer = connect(mapStateToProps, { updateCacheInvalidation })(Cache);

export default CacheContainer;
