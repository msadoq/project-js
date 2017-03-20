import { PropTypes } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import DynamicView from './DynamicView';

const mapStateToProps = (state, { viewId }) => {
  const formula = _get(state,
    ['views', viewId, 'configuration', 'entryPoints', 0, 'connectedData', 'formula']);
  return {
    formula,
  };
};
export const DynamicViewContainer = connect(mapStateToProps, null)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
