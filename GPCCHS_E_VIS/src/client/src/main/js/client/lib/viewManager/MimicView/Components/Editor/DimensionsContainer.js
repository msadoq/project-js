import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getViewDimensions } from 'viewManager/MimicView/store/configurationSelectors';
import {
updateDimensions,
} from 'store/actions/views';
import Dimensions from './Dimensions';

const mapStateToProps = (state, { viewId }) => {
  const dimensions = getViewDimensions(state, { viewId });
  return {
    width: dimensions.width,
    height: dimensions.height,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  updateDimensions: (width, height) => {
    dispatch(updateDimensions(viewId, width, height));
  },
});

const DimensionsContainer = connect(mapStateToProps, mapDispatchToProps)(Dimensions);

DimensionsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default DimensionsContainer;
