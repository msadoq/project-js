import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPage } from '../../store/selectors/pages';
import Debug from './Debug';

const mapStateToStore = (state, ownProps) => ({
  focusedPage: getPage(state, ownProps.focusedPageId),
});

const DebugContainer = connect(mapStateToStore, {
  dummy: () => ({ type: 'dummy' }),
})(Debug);

DebugContainer.propTypes = {
  focusedPage: PropTypes.string,
  debug: PropTypes.bool,
};

export default DebugContainer;
