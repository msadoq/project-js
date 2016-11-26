import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotMarkers from './PlotMarkers';
import { getView } from '../../../../store/selectors/views';
import {
  updateMarker
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, viewId);
  return {
    axes: view.configuration.axes,
    markers: view.configuration.markers
  };
};

const PlotMarkersContainer = connect(mapStateToProps, {
  updateMarker
})(PlotMarkers);

PlotMarkersContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default PlotMarkersContainer;
