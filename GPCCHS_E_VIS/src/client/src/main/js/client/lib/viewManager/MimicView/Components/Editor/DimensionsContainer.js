// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

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
