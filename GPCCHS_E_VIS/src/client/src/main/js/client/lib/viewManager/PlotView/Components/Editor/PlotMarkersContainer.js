import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getMarkers, getAxes } from 'viewManager/PlotView/store/configurationSelectors';
import {
  updateMarker,
} from 'store/actions/views';
import PlotMarkers from './PlotMarkers';

const mapStateToProps = createStructuredSelector({
  markers: getMarkers,
  axes: getAxes,
});

const PlotMarkersContainer = connect(mapStateToProps, {
  updateMarker,
})(PlotMarkers);

PlotMarkersContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotMarkersContainer;
