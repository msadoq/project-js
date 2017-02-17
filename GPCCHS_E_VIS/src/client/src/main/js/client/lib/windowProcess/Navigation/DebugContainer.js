import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPage } from '../../store/selectors/pages';
import Debug from './Debug';
import { play, pause } from '../../store/actions/hsc';

const mapStateToStore = (state, ownProps) => ({
  focusedPage: getPage(state, { pageId: ownProps.focusedPageId }),
});

const DebugContainer = connect(mapStateToStore, {
  dummy: () => ({ type: 'dummy' }),
  play,
  pause,
})(Debug);

DebugContainer.propTypes = {
  focusedPage: PropTypes.string,
  debug: PropTypes.bool,
};

export default DebugContainer;
